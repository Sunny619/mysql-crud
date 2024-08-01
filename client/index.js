document.addEventListener('DOMContentLoaded', function () {
    fetch('/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});
document.querySelector('#view-all-btn').addEventListener
    ('click', function (event) {
        reloadTable();
    })

document.querySelector('#search-by-name-btn').addEventListener
    ('click', function (event) {
        //console.log("clciked")
        const val = document.querySelector('#search-by-name').value;
        fetch('/searchByName', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                val: val,
            })
        }).then(res => res.json())
            .then(data => {
                loadHTMLTable(data['data'])
            });//insertRowIntoTable(data['data']));
    })
document.querySelector('#search-by-hobby-btn').addEventListener
    ('click', function (event) {
        //console.log("clciked team")
        const val = document.querySelector('#search-by-hobby').value;
        fetch('/searchByHobby', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                val: val,
            })
        }).then(res => res.json())
            .then(data => {
                loadHTMLTable(data['data'])
            });//insertRowIntoTable(data['data']));
    })

document.querySelector('#populate-btn').addEventListener
    ('click', function (event) {
        //console.log("clciked team")
        var nameList = [
            'Time', 'Past', 'Future', 'Dev',
            'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
            'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
            'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
            'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
            'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
            'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
            'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
            'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
            'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
            'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
            'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
            'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
            'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
            'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
            'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
            'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
            'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
            'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
            'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
            'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
          ];
        var hobbyList = [
            'football', 'coding', 'chess', 'cycling','singing'
          ];
          for(var i=0;i<10;i++)
          {
                const randomName = nameList[Math.floor(Math.random() * nameList.length)];
                const randomHobby = hobbyList[Math.floor(Math.random() * hobbyList.length)];
                const email = randomName+"@postman.com"
                const name = randomName
                const hobby = randomHobby
                fetch('/insert', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        email:email,
                        name:name,
                        hobby:hobby
                    })
                }).then(res => res.json())
                    .then(data => insertRowIntoTable(data['data']));
          }

    })

document.querySelector('table tbody').addEventListener
    ('click', function (event) {
        if (event.target.className === "delete-row-btn") {
            deleteRow(event.target.dataset.email);
        }
        if (event.target.className === "modify-row-btn") {
            displayModifyButtons(event.target.parentNode.parentNode);
        }
        if (event.target.className === "modify-col-p-btn") {
            const email = event.target.dataset.email;
            const val = event.target.parentNode.childNodes[0].value
            document.querySelector('#error-msg').innerHTML = "";
            ModifyRow(val,email, "name")
        }
        if (event.target.className === "modify-col-s-btn") {
            const email = event.target.dataset.email;
            const val = event.target.parentNode.childNodes[0].value
            document.querySelector('#error-msg').innerHTML = "";
            ModifyRow(val,email, "hobby")
        }
    });

function displayModifyButtons(row) {
    //console.log(row.childNodes[1]);
    if (row.childNodes[1].childNodes[1].style.display == "none") {
        row.childNodes[1].childNodes[1].style.display = "block";
        row.childNodes[2].childNodes[1].style.display = "block";
    }
    else{
        row.childNodes[1].childNodes[1].style.display = "none";
        row.childNodes[2].childNodes[1].style.display = "none";
    }
}
function ModifyRow(val, email, col ) {
    console.log(email,col,val);

    fetch('/modify', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            val,val,
            email: email,
            col:col
        })
    }).then(res => res.json())
        .then(data => {
            if(data['data'] == 0)
                document.querySelector('#error-msg').innerHTML = "Name cannot be empty";
            else
                reloadTable();
        });
}
function deleteRow(email) {
    console.log(email)
    fetch('/delete', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({
            email: email
        })
    }).then(res => res.json())
        .then(data => {
            reloadTable();
        });//insertRowIntoTable(data['data']));
}

const addBtn = document.querySelector('#add-btn');
addBtn.onclick = () => {
    const email = document.querySelector('#email-input').value;
    const name = document.querySelector('#name-input').value;
    const hobby = document.querySelector('#hobby-input').value;
    console.log(email)
    fetch('/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email:email,
            name:name,
            hobby:hobby
        })
    }).then(res => res.json())
        .then(data => insertRowIntoTable(data['data']));
}
function insertRowIntoTable(data) {
    if (data == 0) {
        document.querySelector('#error-msg').innerHTML = "";
        reloadTable();
    }
    else if (data == 1) {
        document.querySelector('#error-msg').innerHTML = "The given entry already exists";
    }
    else if (data == 2) {
        document.querySelector('#error-msg').innerHTML = "An existing Oncall clashes with the given date range";
    }
    else if (data == 3) {
        document.querySelector('#error-msg').innerHTML = "End date cannot be before the start date";
    }
    else if (data ==4) {
        document.querySelector('#error-msg').innerHTML = "Please enter all the fields";
    }
    else if (data ==5) {
        document.querySelector('#error-msg').innerHTML = "primary cannot be the same as secondary";
    }
}
function loadHTMLTable(data) {

    const table = document.querySelector('table tbody');
    console.log(data)
    let tableHTML = "";
    if (data.length === 0) {
        table.innerHTML = "<tr><td class = 'no-data' colspan = '5'>No Data</td></tr>"
    }

    data.forEach(({ email, name, hobby }) => {

        tableHTML += "<tr>";
        tableHTML += `<td>${email}</td>`;
        tableHTML += `<td><div>${name}</div><div style="display:none"><input type="text" id="name-input"><button class= 'modify-col-p-btn' data-email=${email}>Modify</button></div></td>`;
        tableHTML += `<td><div>${hobby}</div><div style="display:none"><input type="text" id="name-input"><button class= 'modify-col-s-btn' data-email=${email}>Modify</button></div></td>`;
        tableHTML += `<td><button class= 'modify-row-btn' data-email=${email} >Modify</button></td>`;
        tableHTML += `<td><button class= 'delete-row-btn' data-email=${email} >Delete</button></td>`;
        tableHTML += "</tr>";
    });
    table.innerHTML = tableHTML;
}

function reloadTable() {
    fetch('/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}