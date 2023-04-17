let id = localStorage.getItem("id") || "1";
let newques = document.getElementById("reload");
let entrques = document.getElementById("submit");
let element = document.getElementById("ques");
let interval;

id = parseInt(id);
function storeid(num) {
    num = String(id);
    localStorage.setItem("id", num);
}
//var b = setInterval(gettime(createdate) ,100)
newques.addEventListener("click", dispofwelcome);

let data = readdatafromQues();

data.forEach((value) => {
    putdata(value["Subject"], value["Question"], value["id"], value["createdAt"]);
});

let btnResolve = document.getElementById("resolve");
//console.log(resolve);
btnResolve.addEventListener("click", () => {
    let para_id = document.querySelector("#response_ques p");
    //console.log(para_id);
    let quesdata = readdatafromQues();
    let answerdata = readanswer();

    const quesnewdata = quesdata.filter((val) => {
        if (val["id"] != para_id.innerHTML) {
            return val;
        }
    });
    //console.log(quesnewdata);
    const newanswerdata = answerdata.filter((val) => {
        if (val["Uid"] != para_id.innerHTML) {
            return val;
        }
    });
    // console.log(newanswerdata);
    localStorage.setItem("Ques", JSON.stringify(quesnewdata));
    localStorage.setItem("Response", JSON.stringify(newanswerdata));
    element.innerHTML = "";
    //location.reload();

    let datas = readdatafromQues();
    // console.log(datas);

    datas.forEach((value, index) => {
        putdata(value["Subject"], value["Question"], value["id"]);
    });
    dispofwelcome();
});

function readdatafromQues() {
    let datastring = localStorage.getItem("Ques");
    if (!datastring) {
        return [];
    } else {
        return JSON.parse(datastring);
    }
}

//Question Entry and Submit
entrques.addEventListener("click", () => {
    let sub = document.getElementById("subject");
    let ques = document.getElementById("textarea1");
    if (
        sub.value != "" &&
        ques.value != "" &&
        sub.value.replace(/\s/g, "").length &&
        ques.value.replace(/\s/g, "").length
    ) {
        storeinlocal(sub.value, ques.value, id);
        id++;
        storeid(id);
        sub.value = null;
        ques.value = null;
    } else {
        alert("Enter Details Properly");

    }
});

function storeinlocal(data1, data2, numid) {
    let store = {
        id: numid,
        Subject: data1,
        Question: data2,
        createdAt: Date.now(),
    };

    console.log(store.createdAt);
    putdata(data1, data2, numid, store.createdAt);
    storedatainstorge(store);
}

function storedatainstorge(value) {
    let olddata = localStorage.getItem("Ques");
    if (olddata) {
        olddata = JSON.parse(olddata);
        olddata.push(value);
    } else {
        olddata = [value];
    }
    localStorage.setItem("Ques", JSON.stringify(olddata));
}

//Creation of Element and Adding property ;
function putdata(data1, data2, id, date) {
    let newobj = document.createElement("div");
    let hei = document.createElement("h3");
    let spanele = document.createElement("section");
    let hr = document.createElement("hr");
    let p = document.createElement("p");
    let pdate = document.createElement("p");
    p.innerText = id;
    p.style.display = "none";
    hei.innerText = data1;
    spanele.innerText = data2;
    // console.log(subdate);
    interval = setInterval(() => {
        var d = gettime(subdate);
        pdate.innerText = d;
    }, 1000);
    newobj.appendChild(p);
    newobj.appendChild(hei);
    newobj.appendChild(spanele);
    newobj.appendChild(pdate);
    newobj.appendChild(hr);
    newobj.addEventListener("click", () => {
        Response(data1, data2, id);
    });
    element.appendChild(newobj);
}

let welc = document.getElementById("welcome"); //  for welcome add question
let resp = document.getElementById("response"); // for form response

let main = document.getElementById("response_con");

function sortbyvotes(Arr) {
    return Arr.sort((a, b) => {
        let avote = a["Like"] - a["Dislike"];
        let bvote = b["Like"] - b["Dislike"];
        return bvote - avote;
    })
}

function Response(data1, data2, id) {
    welc.style.display = "none";
    resp.style.display = "initial";
    addquestion(data1, data2, id);
    main.innerHTML = "";
    let preanswer = readanswer();
    //changes
    preanswer = sortbyvotes(preanswer);
    // changed done
    preanswer.forEach((value, index) => {
        // console.log(value["Uid"])
        if (parseInt(value["Uid"]) == id) {
            addresponse(value["Name"], value["Answer"], id, value["Rid"], value["Like"], value["Dislike"]);
        }
    });
}
function clearrespo(id) {
    main.innerHTML = "";
    let preanswer = readanswer();
    //changes
    preanswer = sortbyvotes(preanswer);
    // changed done
    preanswer.forEach((value, index) => {
        // console.log(value["Uid"])
        if (parseInt(value["Uid"]) == id) {
            addresponse(value["Name"], value["Answer"], id, value["Rid"], value["Like"], value["Dislike"]);
        }
    });
}

function readanswer() {
    let datastring = localStorage.getItem("Response");
    if (!datastring) {
        return [];
    } else {
        return JSON.parse(datastring);
    }
}

function dispofwelcome() {
    welc.style.display = "initial";
    resp.style.display = "none";
}

function addquestion(data1, data2, id) {
    let p = document.querySelector("#response_ques p");
    let a = document.querySelector("#response_ques h4");
    // console.log(a);
    let b = document.querySelector("#response_ques section");
    //console.log(b);
    p.innerHTML = id;
    a.innerHTML = data1;
    b.innerHTML = data2;
}
let btnans = document.getElementById("submit_response");
btnans.addEventListener("click", getanswer);
let respid = localStorage.getItem("respid") || 1;

function storerespid(num) {
    localStorage.setItem("respid", num);
}
function getanswer() {
    let a = document.getElementById("name");
    let b = document.getElementById("comment");
    let p = document.querySelector("#response_ques p");
    let dataofp = p.innerHTML;
    if (
        b.value != "" &&
        a.value != "" &&
        b.value.replace(/\s/g, "").length &&
        a.value.replace(/\s/g, "").length
    ) {
        storeanswerlocal(a.value, b.value, dataofp, respid);
        //addresponse(a.value,b.value,dataofp);
        a.value = null;
        b.value = null;
        respid++;
        storerespid(respid);
    } else {
        alert("Enter Details properly");
    }
}

function storeanswerlocal(name, answer, id, respid) {
    let response = {
        Rid: respid,
        Name: name,
        Answer: answer,
        Uid: id,
        Like: 0,
        Dislike: 0,
    };
    addresponse(name, answer, id, respid, 0, 0);
    storeanswerinstorge(response);
}

function addresponse(name, answer, idno, respid, like, dislike) {
    let sec = document.createElement("div");
    let a = document.createElement("h4");
    let b = document.createElement("section");
    let c = document.createElement("hr");
    let d = document.createElement("i");
    let e = document.createElement("i");
    e.className = "fa fa-thumbs-up ";
    e.innerText = like;
    e.addEventListener("click", () => {
        let data = readanswer();
        data.forEach((value) => {
            if (respid == value["Rid"]) {
                e.innerText = " " + 1 + parseInt(e.innerText);
                value["Like"] = 1 + parseInt(value["Like"]);
                localStorage.setItem("Response", JSON.stringify(data));
                clearrespo(idno);
            }
        });
    });
    d.className = "fa fa-thumbs-down ";
    d.innerText = dislike;
    d.addEventListener("click", () => {
        let data = readanswer();
        data.forEach((value) => {
            if (respid == value["Rid"]) {
                d.innerText = " " + 1 + parseInt(d.innerText);
                value["Dislike"] = 1 + parseInt(value["Dislike"]);
                localStorage.setItem("Response", JSON.stringify(data));
                clearrespo(idno);
            }
        });
    });
    e.style.marginRight = "2%";
    sec.style.marginLeft = "1%";
    sec.appendChild(a);
    a.innerText = name;
    sec.appendChild(b);
    b.innerText = answer;
    sec.appendChild(e);
    sec.appendChild(d);
    sec.appendChild(c);
    main.appendChild(sec);
}

function storeanswerinstorge(value) {
    let olddata = localStorage.getItem("Response");
    if (olddata) {
        olddata = JSON.parse(olddata);
        olddata.push(value);
    } else {
        olddata = [value];
    }
    localStorage.setItem("Response", JSON.stringify(olddata));
}

const search = () => {
    // console.log("come on")
    let inputtext = document.getElementById("myinput").value.toUpperCase();
    let div = element.getElementsByTagName("div");
    console.log(div);
    for (let i = 0; i < div.length; i++) {
        let htag = div[i].getElementsByTagName("h3")[0];
        let sectiontag = div[i].getElementsByTagName("section")[0];
        if (htag || sectiontag) {
            let textvalue = htag.textContent;
            let text = sectiontag.textContent;
            if (textvalue.toUpperCase().indexOf(inputtext) > -1 || text.toUpperCase().indexOf(inputtext) > -1) {
                div[i].style.display = "";
            }
            else {
                div[i].style.display = "none";
            }
        }
    }
}
function gettime(createdate) {
    const starttime = new Date(0);
    subdate = new Date(date - starttime);
    var seconds = Math.floor((new Date() - createdate) / 1000);
    var interval = seconds / 31536000;
    if (interval >= 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval >= 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval >= 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval >= 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval >= 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

