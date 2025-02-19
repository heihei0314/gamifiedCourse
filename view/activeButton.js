function changeActiveMain(mainID){
    closeCardWindow();
    var activeMain = document.getElementsByClassName("active");
    
    while (activeMain.length > 0) {
        activeMain[0].classList.remove("active");
    }
    var newActiveMain = document.getElementById(mainID);
    newActiveMain.classList.add("active");
}

function changeActiveButton(btnID){
    var activeBtn = document.getElementsByClassName("activebutton");

    while (activeBtn.length > 0) {
        activeBtn[0].classList.add("inactivebutton");
        activeBtn[0].classList.remove("activebutton");
    }
    var newActiveBtn = document.getElementById(btnID);
    newActiveBtn.classList.add("activebutton");
    newActiveBtn.classList.remove("inactivebutton");
    showCards(btnID);
    
}

function changePageButton(btnID){
    var activeBtn = document.getElementsByClassName("activePagebutton");
    while (activeBtn.length > 0) {
        activeBtn[0].classList.add("inactivebutton");
        activeBtn[0].classList.remove("activePagebutton");
    }
    var newActiveBtn = document.getElementById(btnID);
    newActiveBtn.classList.add("activePagebutton");
    newActiveBtn.classList.remove("inactivebutton");
    
    var activePage = document.getElementsByClassName("activePage");
    while (activePage.length > 0) {
        activePage[0].classList.remove("activePage");
    }
    var newActivePage = document.getElementById(btnID+"Page");
    newActivePage.classList.add("activePage");

    var activeLeaderBoard = document.getElementsByClassName("activeLeaderBoard");
    while (activeLeaderBoard.length > 0) {
        activeLeaderBoard[0].classList.remove("activeLeaderBoard");
    }
    var newActivePage = document.getElementById(btnID+"Page");
    newActivePage.classList.add("activeLeaderBoard");
}