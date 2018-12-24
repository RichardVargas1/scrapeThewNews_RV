$(document).ready(function () {
    $('.saveArticle').on("click", function () {
        $.ajax({
            url: "/api/post",
            type: "POST",
            data: { title: $(this).attr("data-title"), link: $(this).attr("data-link") },
            success: function (response) {
                console.log(response);
            }
        });
    });
    $(".addANote").on("submit", function () {
        const url = $(this).attr("data-article");
        $.ajax({
            url: `/api/notes/${url}`,
            type: "POST",
            data: { text: $(this).find("input[name=addANote]").val().trim() },
            success: function (response) {
                console.log(response);
            }
        });
    })
    $(".deleteANote").on("click", function () {
        $.ajax({
            url: `/api/article/${$(this).attr("data-id")}`,
            type: "DESTROY",
            data: { id: $(this).attr("data-id") },
            success: function (response) {
                console.log(response);
            }
        }).then(function () {
            articleSpot.reload();
        })
    });
    $(".del-note").on("click", function () {
        $.ajax({
            url: `/api/notes/${$(this).attr("data-id")}`,
            type: "DESTROY",
            // This refers to the local function, goes for other 'this'
            data: { id: $(this).attr("data-id") },
            success: function (response) {
                console.log(response);
            }
        }).then(function () {
            articleSpot.reload();
        })
    })
})