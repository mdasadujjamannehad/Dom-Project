const mileStonesData = JSON.parse(data).data;

function loadMilestones() {
    const mileStones = document.querySelector('.milestones');

    mileStones.innerHTML = `${mileStonesData.map(function (milestone) {
        return `<div class="milestone border-b" id ='${milestone._id}'>
          <div class="flex">
            <div class="checkbox"><input type="checkbox" onClick = 'markMilestone(this ,${milestone._id})'/></div>
            <div onClick = 'allMileStones(this , ${milestone._id})'>
              <p>
                ${milestone.name}
                <span><i class="fas fa-chevron-down"></i></span>
              </p>
            </div>
          </div>
          <div class="hidden_panel">
          ${milestone.modules.map(function (module) {
            return `<div class="module border-b">
              <p>${module.name}</p>
            </div>`
        }).join("")}
          </div>
        </div>`
    }).join("")}`
};

function allMileStones(submilestones , id) {
    const CurrentPanel = submilestones.parentNode.nextElementSibling;
    const shownPanel = document.querySelector('.show');
    const actives = document.querySelector('.active');

    if(actives && !submilestones.classList.contains('active')){
        actives.classList.remove('active')
    }
    submilestones.classList.toggle('active')

    if (!CurrentPanel.classList.contains('show') && shownPanel) {
        shownPanel.classList.remove('show')
    }


    CurrentPanel.classList.toggle('show');
    showMilestone(id);
}

function showMilestone(id){
  const milestoneImage = document.querySelector('.milestoneImage');
  const title = document.querySelector('.title');
  const details = document.querySelector('.details');
  
  milestoneImage.style.opacity = 0;

  milestoneImage.src = mileStonesData[id].image;
  title.innerText = mileStonesData[id].name;
  details.innerText = mileStonesData[id].description;
}
const milestoneImage = document.querySelector('.milestoneImage');
 milestoneImage.onload = function(){
    this.style.opacity = 1;
 }

 function markMilestone(checkbox , id){
        const doneList = document.querySelector('.doneList')  
        const milestones = document.querySelector('.milestones')
        const item = document.getElementById(id)  

        if(checkbox.checked){
            milestones.removeChild(item);
            doneList.appendChild(item);
        }else{
            milestones.appendChild(item);
            doneList.removeChild(item);
            
            const childnodes = milestones.childNodes;
            const childNodesID = Array.from(childnodes);
            
            childNodesID.sort(function(a, b){
                const First = childNodesID.id
                const second = childNodesID.id
                return First-second
                
            }).forEach(function(lastItems){
                milestones.appendChild(lastItems)
            });
        }
        
 }


loadMilestones()