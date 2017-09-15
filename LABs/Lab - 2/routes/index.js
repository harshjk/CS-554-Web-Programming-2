/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Thu Sep 14 2017
 *  File : index.js
 *******************************************/
const constructorMethod = (app) => {
    app.get("/", (req, response) => {
        response.render("home", {
            pageTitle: "Harsh Kevadia Top 10 10 Favorite Television Shows"
        });
    });
    app.use("*", (req, response) => {
        response.status(400).render("error", {
            pageTitle: "404: Not Found"
        });
    });
}

module.exports = constructorMethod;