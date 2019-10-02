module.exports = function(app, sequelize, models){

    console.log('\tuser requests loaded');

    let User = models.User;

    //region CRUD REQUESTS

    /**
     *   This request gets all the users in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of users
     */
    app.get('/user', function(req, res){
        User.findAll().then(users => {
            res.send({'users': users});
        });
    });

    /**
     *   This request gets a user according to its id.
     *   arguments :
     *               id : the id of the user
     *   returns :
     *               a json object containing the user
     */
    app.get('/user/:id', function(req, res){
        User.findByPk(req.params.id).then(user => {
            res.send({'user': user});
        });
    });

    /**
     *  This requests creates a new user with the attributes of the user (too long for description)
     *  arguments :
     *              first_name: the first name of the user
     *              last_name: the last name of the user
     *              surname: the surname of the user
     *              birthday: the birthday of the user
     *              phone_number: the phone number of the user
     *              email: the email address of the user
     *              licence_date: the date of obtention of the licence of the user
     *              licence_scan_url: the url for the scan of the licence
     *              profile_pic_url: the url for the profile picture of the user
     *              tshirt_size: the tshirt size of the user, between XS, S, M, L and XL
     *              alcoholic_beverage_consumption: the number of alcoholic consumption of the user
     *              food_and_beverage_consumption: the number of non-alcoholic consumption of the user
     *              balance: the balance of the account of the user
     *              comment: a comment the user has made about itself
     *              experience: the experience of the user in other events
     *              incapacity: the incapacity the user might have
     *              specialty_id: the specialty of the user
     *
     *  returns :
     *              a json object containing the created user
     */
    app.post('/user', function(req, res){
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            surname: req.body.surname,
            birthday: req.body.birthday,
            phone_number: req.body.phone_number,
            email: req.body.email,
            licence_date: req.body.licence_date,
            licence_scan_url: req.body.licence_scan_url,
            profile_pic_url: req.body.profile_pic_url,
            tshirt_size: req.body.tshirt_size,
            alcoholic_beverage_consumption: req.body.alcoholic_beverage_consumption,
            food_and_beverage_consumption: req.body.food_and_beverage_consumption,
            balance: req.body.balance,
            comment: req.body.comment,
            experience: req.body.experience,
            incapacity: req.body.incapacity,
            specialtyId: req.body.specialty_id
        }).then(user => {
            res.send({'user': user});
        }).catch(err => {
            res.send({'error': err});
        });
    });

    /**
     *  This requests updates a user according to its id.
     *  arguments :
     *              id : the id of the user
     *              first_name: the first name of the user
     *              last_name: the last name of the user
     *              surname: the surname of the user
     *              birthday: the birthday of the user
     *              phone_number: the phone number of the user
     *              email: the email address of the user
     *              licence_date: the date of obtention of the licence of the user
     *              licence_scan_url: the url for the scan of the licence
     *              profile_pic_url: the url for the profile picture of the user
     *              tshirt_size: the tshirt size of the user, between XS, S, M, L and XL
     *              alcoholic_beverage_consumption: the number of alcoholic consumption of the user
     *              food_and_beverage_consumption: the number of non-alcoholic consumption of the user
     *              balance: the balance of the account of the user
     *              comment: a comment the user has made about itself
     *              experience: the experience of the user in other events
     *              incapacity: the incapacity the user might have
     *              specialtyId: the specialty of the user
     *
     *  returns :
     *              the updated object
     */
    app.put('/user/:id', function(req, res){
        User.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                surname: req.body.surname,
                birthday: req.body.birthday,
                phone_number: req.body.phone_number,
                email: req.body.email,
                licence_date: req.body.licence_date,
                licence_scan_url: req.body.licence_scan_url,
                profile_pic_url: req.body.profile_pic_url,
                tshirt_size: req.body.tshirt_size,
                alcoholic_beverage_consumption: req.body.alcoholic_beverage_consumption,
                food_and_beverage_consumption: req.body.food_and_beverage_consumption,
                balance: req.body.balance,
                comment: req.body.comment,
                experience: req.body.experience,
                incapacity: req.body.incapacity,
                specialtyId: req.body.specialty_id
            },{
                where: {
                    id: req.params.id
                }
            }
        ).then(() => {
            User.findByPk(req.params.id)
                .then(user => {
                    res.send({'user': user});
                })
                .catch(err => {
                    res.send({'error': err});
                });
        }).catch(err => {
            res.send({'error': err});
        });
    });

    /**
     *  This request deletes a user according to its id.
     *  arguments :
     *              id : the id of the user
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/user/:id', function(req, res){
        User.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({'result': result});
        }).catch(err => {
            res.send({'error': err});
        });
    });

    //endregion

    //region VALIDATING USER

    /**
     *  This request validates a user so it can use the calls for a validated user
     *  arguments:
     *              id: the id of the user
     *
     *  returns:
     *              a json object containing the updated user
     */
    app.put('/user/:id/validate', function(req, res){
       User.update({
               validity_status: true
           },{
               where: {
                   id: req.params.id
               }
           })
           .then(() => {
               User.findByPk(req.params.id)
                   .then(user => {
                       res.send({'user': user});
                   })
                   .catch(err => {
                       res.send({'error': err});
                   });

           })
           .catch((err) => {
               res.send({'error': err});
           })
    });

    /**
     *  This request devalidates a user
     *  arguments:
     *              id: the id of the user
     *
     *  returns:
     *              a json object containing the updated user
     */
    app.put('/user/:id/invalidate', function(req, res){
        User.update({
                validity_status: false
            },{
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                User.findByPk(req.params.id)
                    .then(user => {
                        res.send({'user': user});
                    })
                    .catch(err => {
                        res.send({'error': err});
                    });
            })
            .catch((err) => {
                res.send({'error': err});
            })
    });

    //endregion

    //region TEAM MANIPULATION

    /**
     *  This request gets the team(s) of a user
     *  arguments:
     *              id_user: the id of the user
     *  returns:
     *              a json object containing the relations
     */
    app.get('/user/:id_user/team', function(req, res){
        let Team = models.Team;
        User.findByPk(req.params.id_user).then(user => {
            user.getTeams().then(result => {
                res.send({'user_teams': result});
            }).catch(err => {
                console.log(err);
                res.send({'error': err});
            });
        }).catch(err => {
            res.send({'error': err});
        });
    });

    /**
     *  This request adds a team to a user
     *  arguments:
     *              id_user: the id of the user
     *              id_team: the id of the team
     *  returns:
     *              a json object containing the created relation
     */
    app.post('/user/:id_user/team/:id_team', function(req, res){
        let Team = models.Team;
        User.findByPk(req.params.id_user).then(user => {
            Team.findByPk(req.params.id_team).then(team => {
                user.addTeams(team).then(result => {
                    res.send({'user_teams': result});
                }).catch(err => {
                    console.log(err);
                    res.send({'error': err});
                });
            }).catch(err => {
                res.send({'error': err});
            });
        }).catch(err => {
            res.send({'error': err});
        });
    });

    /**
     *  This request deletes a team from a user
     *  arguments:
     *              id_user: the id of the user
     *              id_team: the id of the team
     *  returns:
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/user/:id_user/team/:id_team', function(req, res){
        let Team = models.Team;
        User.findByPk(req.params.id_user).then(user => {
            Team.findByPk(req.params.id_team).then(team => {
                user.removeTeams(team).then(result => {
                    res.send({'result': result});
                }).catch(err => {
                    console.log(err);
                    res.send({'error': err});
                });
            }).catch(err => {
                res.send({'error': err});
            });
        }).catch(err => {
            res.send({'error': err});
        });
    });

    //endregion
};