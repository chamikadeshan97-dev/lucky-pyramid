export const lotteryNames = ['Mega Power','Govisetha','Ada Sampatha','Dhana Nidhanaya','Handahana','Mahajana Sampatha','NLB Jaya','Suba Dawasak','Lottery 9 (placeholder)'];
export const demoData = {
 ticketPrice:40,
 customer:{name:'Nimal Perera',mobile:'077***4567',registeredDate:'2024-01-12',walletBalance:2500,purchaseCount:12},
 lotteries:lotteryNames.map((name,i)=>({id:i+1,name,ticketsPurchased:[40,30,20,10,0,0,0,0,0][i],winningTickets:[4,3,2,0,0,0,0,0,0][i],winningAmount:[5000,2000,1000,0,0,0,0,0,0][i],overallWinRate:[.03,.025,.02,.018,.015,.02,.012,.01,.01][i]})),
 lookalikeMix:{'Mega Power':.4,Govisetha:.3,'Ada Sampatha':.2,'Dhana Nidhanaya':.1},
 popularMix:{'Mega Power':.3,Govisetha:.35,'Ada Sampatha':.2,'Dhana Nidhanaya':.15},
 nlb:[{name:'Mega Power',totalPrizes:2400000000,jackpotWinners:14,soldOnWinWay:true},{name:'Govisetha',totalPrizes:1800000000,jackpotWinners:19,soldOnWinWay:true},{name:'Dhana Nidhanaya',totalPrizes:1200000000,jackpotWinners:8,soldOnWinWay:true},{name:'Ada Sampatha',totalPrizes:600000000,jackpotWinners:25,soldOnWinWay:true},{name:'Example NLB Other',totalPrizes:300000000,jackpotWinners:4,soldOnWinWay:false}],smoothingK:50
};
export const money=(n)=>'Rs. '+Number(n).toLocaleString('en-US',{maximumFractionDigits:0});
export const pct=(n)=>(100*n).toFixed(1)+'%';
