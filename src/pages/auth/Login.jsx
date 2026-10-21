
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  
  Typography,
} from "antd";
import {
  MobileOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import {
  requestLoginOtp,
  verifyLoginOtp,
} from "../../services/authService";

const { Text } = Typography;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

function normalizeMobile(value) {
  const digits = String(value || "").replace(/\D/g, "");

  let local = digits;

  if (local.startsWith("94")) {
    local = "0" + local.slice(2);
  } else if (local.startsWith("7") && local.length === 9) {
    local = "0" + local;
  }

  if (!/^07\d{8}$/.test(local)) {
    throw new Error("Enter a valid Sri Lankan mobile number.");
  }

  return "94" + local.slice(1);
}

export default function Login() {
  const { isAuthenticated, loginWithToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [form] = Form.useForm();

  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  const busyRef = useRef(false);
  const otpRequestRef = useRef(null);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  async function sendOtp(values) {
    if (busyRef.current) return;

    setError("");
    setMessage("");

    try {
      const normalized = normalizeMobile(values.mobile);

      busyRef.current = true;
      setLoading(true);

      const response = await requestLoginOtp(normalized);

      setMobile(normalized);
      setOtp("");
      setStep("otp");
      setCountdown(
        Number(response?.retryAfterSeconds) > 0
          ? Number(response.retryAfterSeconds)
          : RESEND_SECONDS
      );

      setMessage(
        response?.message ||
          "If this number is eligible, a verification code will be sent."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to send OTP."
      );
    } finally {
      setLoading(false);
      busyRef.current = false;
    }
  }

  async function verifyOtp() {
    if (busyRef.current) return;

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setError("");
    setMessage("");
    busyRef.current = true;
    setLoading(true);

    try {
      const result = await verifyLoginOtp(mobile, otp);

      if (!result?.accessToken) {
        throw new Error("Authentication token was not returned.");
      }

      await loginWithToken(
        result.accessToken,
        result.customer
      );

      navigate(
        location.state?.from?.pathname || "/home",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
      busyRef.current = false;
    }
  }

  async function resendOtp() {
    if (countdown > 0 || busyRef.current) return;

    await sendOtp({ mobile });
  }

  function goBack() {
    setStep("mobile");
    setOtp("");
    setError("");
    setMessage("");
  }

  return (
    <div className="login-wrap">
      <div className="login-promo">
        <div className="brand-symbol">
          W<span>★</span>
        </div>

        <span className="eyebrow">
          WINWAY CUSTOMER EXPERIENCE
        </span>

        <h1>
          Your lotteries.
          <br />
          Your choices.
          <br />
          <em>Your Lucky Pyramid.</em>
        </h1>

        <p>
          Explore your historical winnings, discover
          personalised bundles, and preview your ticket mix.
        </p>

        <div className="login-deco">
          ✦ &nbsp; ★ &nbsp; ✦
        </div>
      </div>

      <div className="login-side">
        <div className="login-form">
          <div className="login-mobile-logo">
            ★ WINWAY
          </div>

          <span className="eyebrow red">
            CUSTOMER PORTAL
          </span>

          {step === "mobile" ? (
            <>
              <h2>Welcome back!</h2>

              <p>
                Enter your registered mobile number
                to access Lucky Pyramid.
              </p>

              {error && (
                <Alert
                  type="error"
                  showIcon
                  message={error}
                  style={{ marginTop: 18 }}
                />
              )}

              <Form
                form={form}
                layout="vertical"
                size="large"
                onFinish={sendOtp}
                style={{ marginTop: 24 }}
              >
                <Form.Item
                  label="Mobile number"
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: "Enter your mobile number",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();

                        try {
                          normalizeMobile(value);
                          return Promise.resolve();
                        } catch {
                          return Promise.reject(
                            new Error("Enter a valid mobile number")
                          );
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    prefix={<MobileOutlined />}
                    placeholder="0771234567"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={15}
                  />
                </Form.Item>

                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                >
                  Send Verification Code →
                </Button>
              </Form>

              <div className="demo-credentials">
                <SafetyCertificateOutlined /> Secure mobile verification
                <div>
                  <small>
                    A one-time verification code will be sent
                    to your registered mobile number.
                  </small>
                </div>
              </div>
            </>
          ) : (
            <>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={goBack}
                style={{
                  paddingLeft: 0,
                  marginBottom: 15,
                }}
              >
                Change mobile number
              </Button>

              <div
                style={{
                  fontSize: 36,
                  color: "#d51d37",
                  marginBottom: 12,
                }}
              >
                <SafetyCertificateOutlined />
              </div>

              <h2>Verify your mobile</h2>

              <p>
                Enter the 6-digit code sent to
                <br />
                <strong>+{mobile}</strong>
              </p>

              {error && (
                <Alert
                  type="error"
                  showIcon
                  message={error}
                  style={{ marginTop: 18 }}
                />
              )}

              {message && (
                <Alert
                  type="success"
                  showIcon
                  message={message}
                  style={{ marginTop: 18 }}
                />
              )}

              <div
                style={{
                  marginTop: 30,
                  marginBottom: 25,
                }}
              >
                <Text strong>Verification Code</Text>

                <div style={{ marginTop: 12 }}>
                  <Input.OTP
                    length={OTP_LENGTH}
                    value={otp}
                    onChange={setOtp}
                    size="large"
                    inputMode="numeric"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <Button
                block
                type="primary"
                size="large"
                loading={loading}
                disabled={otp.length !== OTP_LENGTH}
                onClick={verifyOtp}
              >
                Verify & Continue →
              </Button>

              <div
                style={{
                  textAlign: "center",
                  marginTop: 22,
                }}
              >
                <Text type="secondary">
                  Didn't receive the code?
                </Text>

                <div style={{ marginTop: 8 }}>
                  <Button
                    type="link"
                    disabled={countdown > 0 || loading}
                    onClick={resendOtp}
                  >
                    {countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend OTP"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
