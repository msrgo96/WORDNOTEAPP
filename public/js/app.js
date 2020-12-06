var userUid = "";

var firebaseConfig = {
  apiKey: "AIzaSyDOhs_PekmxtLgMrhpXrNQnTnkmlKxF5GE",
  authDomain: "wordnoteapp.firebaseapp.com",
  databaseURL: "https://wordnoteapp.firebaseio.com",
  projectId: "wordnoteapp",
  storageBucket: "wordnoteapp.appspot.com",
  messagingSenderId: "869707736142",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
        //when logined
        $('#signinBtn').hide();
        $('#signoutBtn').show();
        $('#signupBtn').hide();
        userUid = user.uid;

        var db = firebase.firestore();
        

        //set data on db
        db.collection('user').doc(userUid).set({
            "email" : user.email
        });

        //get data on db
        db.collection("user").doc(userUid).get().then(function(doc) {
            if (doc.exists) {
                var data = doc.data();
                console.log("Document data:", data);
                $('#userInfo').html(data.email + " 환영합니다");
            } 
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        
    }
    else {
        //when logout
        $('#signinBtn').show();
        $('#signoutBtn').hide();
        $('#signupBtn').show();
        userUid = "";
        userEmail = "";
        $('#userInfo').html("");
    }
});

console.log(firebase);



window.onload  = function() {
    //logout function
    $("#signoutBtn").click(function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
            alert("로그아웃 되었습니다.");
            location.href = "index.html";
        }).catch(function(error) {
          // An error happened.
            alert("ERROR: " + error.code);
        });
    })
    
}



//create edit note form
function createEditNote() {
    var output = "";
    
    output += " <input id=\'noteTitle\' placeholder='제목' style=\'width: 40%; height: 50px; margin-left: 30%; margin-top: 50px; text-align: center; font-size: 40px;\'></input>  ";
    
    output += "<table><tr><th>단어</th><th>뜻</th></tr>";
    
    for (var i = 1; i <= 10; i++) output += "<tr><td> <input id='word" + i + "' placeholder='word" + i + "'> </td><td> <input id='mean" + i + "' placeholder='mean" + i + "'> </td></tr>"
    
    output += "</table>";
    output += "<button id=\"uploadNoteBtn\" style=\'margin-top: 20px; width: 10%; margin-left: 45%;\'>저장하기</button>";
    
    
    
    //uploadNote function
    output += "\
    <script>\
    $(\"#uploadNoteBtn\").click(function() {\
        var title = $('#noteTitle').val();\
        for (var i = 1; i <= 10; i++) {\
        var word = $('#'+'word' + i).val();\
        var mean = $('#'+'mean' + i).val();\
        addWord(title, word, mean, i);\
        }\
    });\
    </script>\
    ";
    
    return output;
}

/*
function isNoteExist(title) {
    var docRef = db.collection("noteList").doc(title);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            alert("이미 있는 제목입니다. 다른 제목을 입력해주세요");
            return true;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
*/
//uploadNote() -> addWord()
function addWord(title, word, mean, index) {
    if (word == "" || mean == "") {
        alert("word" + index + " 또는 mean" + index + " 을 입력해주세요");
        return;
    }
    if (title == "") alert("제목을 입력해주세요");
    
    var data;
    switch(index) {
        case 1: data = { word1 : word, mean1 : mean, searchToken : true}; break;
        case 2: data = { word2 : word, mean2 : mean, searchToken : true}; break;
        case 3: data = { word3 : word, mean3 : mean, searchToken : true}; break;
        case 4: data = { word4 : word, mean4 : mean, searchToken : true}; break;
        case 5: data = { word5 : word, mean5 : mean, searchToken : true}; break;
        case 6: data = { word6 : word, mean6 : mean, searchToken : true}; break;
        case 7: data = { word7 : word, mean7 : mean, searchToken : true}; break;
        case 8: data = { word8 : word, mean8 : mean, searchToken : true}; break;
        case 9: data = { word9 : word, mean9 : mean, searchToken : true}; break;
        case 10: data = { word10 : word, mean10 : mean, searchToken : true}; break;
    }
        
    
    
    // set data on db
    db.collection('user').doc(userUid).collection('noteList').doc(title).set(data, {merge: true})
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}