document.getElementById('show-spin').style.display='none';
function searchButton() {
    const inputTextElement = document.getElementById('userInput');
    const input = inputTextElement.value;
    inputTextElement.value = '';
    document.getElementById('show-spin').style.display='block';
    if (input == '') {
        document.getElementById('show-spin').style.display='none';
        document.getElementById('emptyField').innerHTML=`<h1>Enter Team Name</h1>`;
    }
    else {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${input}`)
            .then(res => res.json())
            .then(data => displaySearchTeam(data.teams));
    }
}

const displaySearchTeam = (searchData) => {
    console.log(searchData);
    const teamDisplay = document.getElementById('team');
    if (searchData == null) {
        document.getElementById('show-spin').style.display='none';
        document.getElementById('invalidField').innerHTML=`<h1>Enter Valid Team Name</h1>`;
    }
    else {
        document.getElementById('show-spin').style.display='none';
        teamDisplay.innerHTML='';
        searchData.forEach(data => {
            console.log(data);
            const div = document.createElement('div');
            div.classList.add('card-group');
            div.innerHTML = `
            <div class="card">
                <img src="${data.strTeamBadge}" class="card-img-top img-thumbnail" width="50%" height="60%" alt="...">
                <div class="card-body">
                 <h5 class="card-title">${data.strTeam}</h5>
                 <p class="card-text">${data.strDescriptionEN.slice(0, 250)}</p>
                </div>
                <div class="card-footer">
                 <small class="text-muted">Last updated 3 mins ago</small>
                 </div>
            </div>
            `
            teamDisplay.appendChild(div);
        })
    }
}

const loadTeam = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t')
        .then(res => res.json())
        .then(data => dispalyTeam(data.teams));
}
loadTeam();
const dispalyTeam = (teams) => {
    const teamDisplay = document.getElementById('teamDisplay');
    teams.forEach(team => {
        const div = document.createElement('div');
        div.classList.add('card-group');
        div.innerHTML = `
        <div class="card">
            <img src="${team.strTeamBadge}" class="card-img-top img-thumbnail" width="50%" height="60%" alt="...">
            <div class="card-body">
             <h5 class="card-title">Card title</h5>
             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card-footer">
             <small class="text-muted">Last updated 3 mins ago</small>
             </div>
        </div>
        `
        teamDisplay.appendChild(div);
    })
}