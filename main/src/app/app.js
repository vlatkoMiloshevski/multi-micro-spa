(function () {
    if (localStorage.getItem("user")) {
        $('#loggedUser').text(JSON.parse(localStorage.getItem("user")).username);
        $("#login_form").toggleClass("display-none");
        $(".loader").toggleClass("display-block");
        helper();
    }

    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $(".menu-body-toggle").toggleClass("menu-color");
    });

    $("#login_btn").click(function (e) {
        loginHelper();
    });

    $(".input_pass").keypress(function (e) {
        if (e.keyCode == 13) {
            loginHelper();
        }
    });

    function loginHelper() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (!username || !password) {
            console.error("invalid login data");
            return;
        }

        $.ajax({
            method: "POST",
            data: { username: username, password: password },
            url: "/api/login",
            success: function (success) {
                localStorage.setItem("user", JSON.stringify(success.user));
                $('#loggedUser').text(success.user.username);
                $("#login_form").toggleClass("display-none");
                $(".loader").toggleClass("display-block");
                helper();
            },
            error: function (error) {
                console.log(error.responseJSON.message);
            }
        });
    }

    $("#register_btn").click(function (e) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;

        if (!username || !password || !email) {
            console.error("invalid register data");
            return;
        }

        $.ajax({
            method: "POST",
            data: { username: username, password: password, email: email },
            url: "/api/register",
            success: function (success) {
                localStorage.setItem("user", JSON.stringify(success.user));
                $('#loggedUser').text(success.user.username);
                $("#login_form").toggleClass("display-none");
                $(".loader").toggleClass("display-block");
                helper();
            },
            error: function (error) {
                console.log(error.responseJSON.message);
            }
        });
    });

    $("#logout_btn").click(function (e) {
        $.ajax({
            method: "POST",
            data: {},
            url: "/api/logout",
            success: function (success) {
                localStorage.clear("user");
                $('#loggedUser').text('');
                window.location.reload();
            },
            error: function (error) {
                console.log("Error while trying to logout");
                localStorage.clear("user");
                $('#loggedUser').text('');
                window.location.reload();
            }
        });
    });

    function helper() {
        setTimeout(function () {
            $(".loader").toggleClass("display-block");
            $("#page-content-wrapper").toggleClass("display-block");
            $(".menu-toggle").toggleClass("display-block");
            $(".menu-body-toggle").toggleClass("menu-color");
        }, 2000)
    }
})();