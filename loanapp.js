<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	
<script>
const loanamount = document.querySelector(".loan-amount");

const interestrate = document.querySelector(".interest-rate");
	const loantenure = document.querySelector(".loan-tenure");


	const loanEMIvalue =  document.querySelector(".loan-Emi .value");
const loanInterestvalue = document.querySelector(".Total-interest .value");

const totalamountvalue = document.querySelector(".total-amount .value");

const calculatebutton = document.querySelector(".calculate");

/*converting the strings to number*/
let loanAmount = parseFloat(loanamount.value);
let Interestrate = parseFloat(interestrate.value);
let LoanTenure = parseFloat(loantenure.value);

let interest = Interestrate /12 /100;
let mychart;


// This function checks if the inputs are valid
function checkinput(){
let loanAmountvalue = loanamount.value;
let interestratevalue = interestrate.value
let loanTenurevalue = loantenure.value;
let regex = /^[0-9]+$/

if(!loanAmountvalue.match(regex)){
loanamount.value = "10000"
}


if(!loanTenurevalue.match(regex)){
loantenure.value = "12"

}


let regexDec = /^(\d*\.)?\d+$/;
if(!interestratevalue.match(regexDec)){
	interestrate.value = "7.5";
}
}

// Calculation for the EMI value
function calculateEMI(){
	checkinput();
	updateInput();
let EMI = 
loanAmount*
interest*
(Math.pow(1 + interest, LoanTenure) /
	(Math.pow(1 + interest, LoanTenure) -1));

return EMI;

};



function displaychart(loanInterestvalue){
const ctx = document.getElementById('myChart').getContext("2d");
 mychart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ['Total Interest', 'Principal Loan Amount'],
      datasets: [
      {
        data: [loanInterestvalue,loanAmount],
        backgroundColor:["#FFBF00","#7CB9E8"],
        borderWidth: 0,
      },
      ],
    },
    
  });
};


// we want to update the chart

function updatechart(loanInterestvalue){

mychart.data.datasets[0].data[0] = loanInterestvalue;
mychart.data.datasets[0].data[1] = loanAmount;
mychart.update();	



}


//updating values based on EMI
function updatedata(EMI){
loanEMIvalue.innerHTML = Math.round(EMI);/*Math.round rounds the number to the nearest integer*/
let totalamount = Math.round(LoanTenure*EMI);
totalamountvalue.innerHTML = totalamount/*putting the total amount into html*/

let totalinterestPayable = Math.round(totalamount-loanAmount)
loanInterestvalue.innerHTML = totalinterestPayable;
if(mychart){
	updatechart(totalinterestPayable)
}else{
displaychart(totalinterestPayable)	
}

}













function updateInput(){
 loanAmount = parseFloat(loanamount.value);
 Interestrate = parseFloat(interestrate.value);
 LoanTenure = parseFloat(loantenure.value);

 interest = Interestrate /12 /100;



}
function INIT(){
	let emi = calculateEMI()
updatedata(emi);
}

INIT();



calculatebutton.addEventListener("click",INIT)


const inputevent = document.querySelector("input")
inputevent.addEventListener("keyup",pressenter)

function pressenter(e){
if(e.key==="Enter"){
	INIT()
}

}





</script>