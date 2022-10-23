class ResumePortal{
    constructor(resumes, idx, cnt){
        this.resumes=resumes;
        this.currentResumeIndex=idx;
        this.resumeCount= cnt;
    }
}

//get resume: if no input parameter is sent back, this function will send the current Resume 
ResumePortal.prototype.getResume = function(resumeIdx=this.currentResumeIndex){
    console.log("current idx "+this.currentResumeIndex+" resume idesx is :"+resumeIdx);
	return this.resumes[resumeIdx];
}

ResumePortal.prototype.isLastResume= function(){
    console.log("isLastResume -->current idx "+this.currentResumeIndex);
    return (this.currentResumeIndex==(this.resumeCount-1))? true: false;
}

ResumePortal.prototype.isFirstResume=function(){
    console.log("isFirstResume -->current idx "+this.currentResumeIndex);
    return (this.currentResumeIndex==0)?true:false;
}

ResumePortal.prototype.isOnlyResume=function(){
    console.log("isOnlyResume -->current idx "+this.currentResumeIndex);
    if(this.isLastResume()) {
        if (this.isFirstResume()){
            return true;
        }
    }
    return false;
}

window.onload = function() {
    // document.onmouseover = function() {
    //     //User's mouse is inside the page.
    //     window.innerDocClick = true;
    //     console.log("inner doc click :innnn the opage");
    // }
    
    // document.onmouseleave = function() {
    //     //User's mouse has left the page.
    //     window.innerDocClick = false;
    //     console.log("inner doc click :left the opage");
    // }
    
    // window.onhashchange = function() {
    //     if (window.innerDocClick) {
    //         //Your own in-page mechanism triggered the hash change
    //         console.log("hash change");
    //     } else {
    //         //Browser back button was clicked
    //         console.log("back button clicked");
    //     }
    // }

    // const state={}
    // window.history.pushState(state, '', window.location.href);
    

    // window.onpopstate = () => setTimeout( window.history.go(1), 0);
    // window.onpopstate = function () {
    //     window.history.go(1);
    // };

    //Focus to the serach input text
    document.querySelector(".searchInput").focus();
    // Get the modal
 modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

    let currUser = JSON.parse(localStorage.getItem("loginDeets"));
    let username = currUser.username; //from local storage
    document.querySelector(".login-user").innerText=username;

    document.querySelector(".searchInput").addEventListener("change", filterSearchMethod);
    document.querySelector("#home").addEventListener("click",getAllResumes);
    document.querySelector("#next").addEventListener("click",getNextResume);
    document.querySelector("#prev").addEventListener("click", getPrevResume);
    fetchAndInitialize();
}

function fetchAndInitialize(){
    console.log("fetchAndInitialize");
    const dataJSONURL = "https://raw.githubusercontent.com/bharadwn/Resume-Portal-Adv_JS/0975397d52730cc1c7248574f582c2f0dd8ed7cb/Data.json";

    console.log(dataJSONURL);
    
    //fetch the JSON data, call initialize
    fetch(dataJSONURL).then(response=>{return response.json()})
    .then(value=>{storeAndDisplayAllResumes( value.resume)})
    .catch(error=>{
        console.log("error is----"+error.message);
    });    
}
var resPor, resumeList , modal;

function storeAndDisplayAllResumes(resListAll){
    resumeList= resListAll;//storing all resumes to go back once Home button is pressed
    initializeResumes(resListAll);
}
function initializeResumes(resumes){
	console.log("---------------display here-----------------"+resumes[0].id+"--"+resumes.length);
    
    resPor= new ResumePortal(resumes, 0,resumes.length);
    //resume = resPor.getResume();
    displayResume(resPor.getResume());//will get Current Resume if no var is passed
}

//TO get All REsumes
function getAllResumes(){
    initializeResumes(resumeList);
    document.querySelector(".searchInput").value="";
}

function getNextResume(){
    console.log("this.getNextResume"+resPor.currentResumeIndex+"isLastResume: "+resPor.isLastResume());
    if (resPor.isLastResume()){
        return;
    }
    resPor.currentResumeIndex++;
    console.log("this.currentResumeIndex"+this.currentResumeIndex);
    // resume = resPor.getResume(this.currentResumeIndex);
    displayResume(resPor.getResume(this.currentResumeIndex));
    // if (this.currentResumeIndex)
}

function getPrevResume(){
    console.log("this.getPrevResume isLastResume?"+resPor.isFirstResume());
    if (resPor.isFirstResume()){
        return;
    }
    resPor.currentResumeIndex--;
    console.log("this.currentResumeIndex"+this.currentResumeIndex);
    // resume = resPor.getResume(this.currentResumeIndex);
    displayResume(resPor.getResume(this.currentResumeIndex));
}


function liConvertor(item){
	let splitArray= (""+item).split(",");
	console.log("---------->"+splitArray[0]);
	let itemLiStr="";
	for(let element=0;element<(splitArray.length);element++){
		itemLiStr=itemLiStr+`<li>${splitArray[element]}</li>`;
		console.log(itemLiStr);
	}
	return itemLiStr;
}//liCOnvertor

function arrayOrObject(item){
    console.log("inside arrayOrObject")
    if ((item) instanceof Array){
        console.log("this is an array,"+typeof(item));
        console.log(item.length);
        for (let value=0;value<item.length;value++){
            console.log(item[value]);
        }
    } else{
        if ((item) instanceof Object){
            console.log("resume are "+typeof(item));
        }
    }
}//arrayOrObject

function disableBtnsAcc(){
    if (resPor.isOnlyResume()||resPor.resumeCount==0){
        document.getElementById("prev").disabled = true; 
        document.getElementById("next").disabled = true; 
    } else {
        if (resPor.isFirstResume()){
            document.getElementById("prev").disabled = true; 
        } else{
            document.getElementById("prev").disabled = false; 
        }
        if (resPor.isLastResume()){
            document.getElementById("next").disabled = true; 
        }else {
            document.getElementById("next").disabled = false; 
        }
    }
}//disableBtnsAcc

function displayResume(resume) {
    disableBtnsAcc();
    const{
        id,
        basics : { name,
                    AppliedFor :appliedFor,
                    image,
                    email,
                    phone,
                    profiles : {
                        network : urlName,
                        url : urlLink
                    }
                },
        skills : {
            keywords: techSkills
        },
        work : {
            "Company Name":weCompanyName,
            Position:wePosition,
            "Start Date":weStartDate,
            "End Date":weEndDate,
            Summary:weSummary
        },
        Internship : {
            "Company Name":inCompanyName,
            Position:inPosition,
            "Start Date":inStartDate,
            "End Date":inEndDate,
            Summary:inSummary,
        },
        projects : {
            name:projTitle,
            description:projDesc,
        },
        education : {
            eduUG="UG",
            UG:{institute:UG1,course:UG2,"Start Date":UG3,"End Date":UG4,"cgpa":UG5},
            eduPU="PU",
            "Senior Secondary":{institute:PU1,"cgpa":PU2},
            eduHigh="High School",
            "High School":{institute:HS1, "cgpa":HS2}
        },
        achievements: {
            Summary:achievements
        },
        interests:  
        {
            hobbies
        }
        } = resume;

    console.log("id is:"+id+name+appliedFor);
    // console.log("id is new---:"+`${id}`+`${name}`+`${appliedFor}`);
    
    document.querySelector("#candidate-name").innerText = `${name}`;
    document.querySelector("#candidate-pic").innerHTML='<img src="./images/resumeIcon.jpg"  width=150px height=127px / >';
    document.querySelector("#candidate-role").innerText = `${appliedFor}`;

    displaySideBar();
    displayResumeBody();
       
    function displaySideBar(){
        document.querySelector("#phone").innerText = `${phone}`;
        document.querySelector("#email").innerText = `${email}`;
        document.querySelector("#urlLink").innerHTML = `<a href="${urlLink}" >${urlName}</a>`;

        
        let techSkillsLiStr=  liConvertor(`${techSkills}`);
        document.querySelector("#skills").innerHTML = `<ul class="noDecorUL">${techSkillsLiStr}</ul>`; 

        let hobbiesLiStr=  liConvertor(hobbies);
        document.querySelector("#hobbies").innerHTML = `<ul class="noDecorUL">${hobbiesLiStr}</ul>`;
    }
    function displayResumeBody(){
        document.querySelector("#companyName").innerText = `${weCompanyName}`;
        document.querySelector("#position").innerText = `${wePosition}`;
        document.querySelector("#startDate").innerText = `${weStartDate}`;
        document.querySelector("#endDate").innerText = `${weEndDate}`;
        document.querySelector("#summary").innerText = `${weSummary}`;

        displayProjects();
        displayEducation();
        displayInternship();
        displayAchievements();
    }
    
    function displayProjects() {
        document.querySelector(".projects").innerHTML = `<div><b>${projTitle}</b>: ${projDesc}</div>`;
    }

    function displayEducation(jsonData) {
        document.querySelector(".education").innerHTML = 
        `<ul >
            <li ><b>${eduUG}</b>: ${UG1},${UG2},${UG3},${UG4},${UG5}</li>
            <li ><b>${eduPU}</b>: ${PU1},${PU2}</li>
            <li ><b>${eduHigh}</b>: ${HS1}, ${HS2}</li>
        </ul>`;
    }
    function displayInternship(){
        // document.querySelector(".intership").innerText= `${resume.Internship}`;
        document.querySelector("#inCompanyName").innerText = `${inCompanyName}`;
        document.querySelector("#inPosition").innerText = `${inPosition}`;
        document.querySelector("#inStartDate").innerText = `${inStartDate}`;
        document.querySelector("#inEndDate").innerText = `${inEndDate}`;
        document.querySelector("#inSummary").innerText = `${inSummary}`;

    }
    function displayAchievements(){
        document.querySelector(".achievements").innerHTML = `<ul ><li>${achievements}</li></ul>`;
    }
}

// var str = jobAppliedForList.map((item) =>( `<li>(${Object.values(item)})</li>`));
// var str1 = jobAppliedForList.map((item) =>( `(${Object.values(item).id})`));
// var str2 = jobAppliedForList.map((item) =>( `(${item.appliedFor})`));
// console.log("the map--->"+str2);

function filterSearchMethod(event){
    console.log("target is:"+event.target.value+"from the DOm:"+document.querySelector(".searchInput").value);
    console.log("resPor.resumes:"+resPor.resumes);
  
    //resumeList: all the resumes... everytime the search is executed on all resumes
    var entryList=(resumeList).filter((item) =>( `${item.basics.AppliedFor}`.toUpperCase().includes(event.target.value.toUpperCase())));
    var newEntryAppliedFor = entryList.map((item) =>( `${item.basics.AppliedFor}`));
    console.log("length is: "+newEntryAppliedFor.length+"null ?"+(newEntryAppliedFor===null)+"empty :"+(newEntryAppliedFor===" "));
   
    if (newEntryAppliedFor.length==0){
        console.log("alert maadi");
        // window.alert("No entries of that keyword! ");
        modal.style.display = "block";
        return;
    }
    var newEntryID = entryList.map((item) =>( `${item.id}`));

    document.querySelector(".searchInput").value=newEntryAppliedFor;
    console.log("ids are:"+typeof(newEntryID));

    initializeResumes(entryList);//showing the search items list
    // if ((newEntryID==="")|| (newEntryID.length==0)||(newEntryID===null)){
    //     window.alert("No entries of that keyword! ");
    // }
    
    for (var j = 0; j < entryList.length; j++) {
        console.log("inside for for eventChnage")
        console.log( Object.values(entryList[j]));
     }

     for (var l = 0; l < newEntryID.length; l++) {
        console.log("inside for newEntryID")
        console.log( Object.values(newEntryID[l]));
     }
}

// function showResume(resume, index){
//     if (resPor.isOnlyResume()||resPor.resumeCount==0){
//         document.getElementById("prev").disabled = true; 
//         document.getElementById("next").disabled = true; 
//     } else {
//         if (resPor.isFirstResume()){
//             document.getElementById("prev").disabled = true; 
//         } else{
//             document.getElementById("prev").disabled = false; 
//         }
//         if (resPor.isLastResume()){
//             document.getElementById("next").disabled = true; 
//         }else {
//             document.getElementById("next").disabled = false; 
//         }
//     }
    
//     console.log(resume.id);
 
//     document.querySelector("#candidate-name").innerText = `${resume.basics.name}`;
    
//     document.querySelector("#candidate-pic").innerHTML='<img src="./images/resumeIcon.jpg"  width=150px height=127px / >';

//     document.querySelector("#candidate-role").innerText = `${resume.basics.AppliedFor}`;

//     displayNSideBar();
//     displayResumeBody();ate-role").innerText = `${resume.basics.AppliedFor}`;
  
//     function displayNSideBar(){
//         document.querySelector("#phone").innerText = `${resume.basics.phone}`;
//         document.querySelector("#email").innerText = `${resume.basics.email}`;
//         document.querySelector("#urlLink").innerHTML = `<a href="${resume.basics.profiles.url}" >${resume.basics.profiles.network}</a>`;
//         document.querySelector("#skills").innerText = `${resume.skills.keywords}`;
//         document.querySelector("#hobbies").innerText = `${resume.interests.hobbies}`;
//     }
    
//     function displayResumeBody(){
//         document.querySelector("#companyName").innerText = `${resume.work["Company Name"]}`;
//         document.querySelector("#position").innerText = `${resume.work.Position}`;
//         document.querySelector("#startDate").innerText = `${resume.work["Start Date"]}`;
//         document.querySelector("#endDate").innerText = `${resume.work["End Date"]}`;
//         document.querySelector("#summary").innerText = `${resume.work.Summary}`;
//         document.querySelector("#phone").innerText = `${resume.basics.phone}`;

//         displayProjects();

//         displayEducation(`${resume.education}`);
//         displayInternship();
//         displayAchievements();
//     }
    

//     function displayProjects() {
//         document.querySelector(".projects").innerHTML = `<div class="subtitle"><b>${resume.projects.name}</b>: ${resume.projects.description}</div>`;
//     }
//     function displayEducation(jsonData) {
      
//         for(var edu in jsonData ){
//             var key = edu;
//             var val = jsonData[edu];
//             // console.log("key-------"+key+"val="+val);
//             for(var j in val){
//                 var sub_key = j;
//                 var sub_val = val[j];
//                 // console.log("------subkey"+sub_key);
//             }
//         }
//         // console.log (edu for `${resume.education}`);
//         document.querySelector(".education").innerHTML = `<div  class="subtitle"><b>${resume.education}</b>: ${resume.education.UG}
//         ${resume.education['Senior Secondary']},
//         </div>`;
//     }
//     function displayInternship(){
//         document.querySelector(".intership").innerText= `${resume.Internship}`;
//     }
//     function displayAchievements(){
//         document.querySelector(".achievements").innerHTML = `<div  class="subtitle">${resume.achievements.Summary}</div>`;
//     }
// }

