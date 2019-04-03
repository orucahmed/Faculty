function validiraj(){
    var user = document.getElementsByName("username");
    var pass = document.getElementsByName("password");
    var div = document.getElementById("login");
    var validacija = new Validacija(div);
    validacija.ime(user[0]);
    validacija.password(pass[0]);
}