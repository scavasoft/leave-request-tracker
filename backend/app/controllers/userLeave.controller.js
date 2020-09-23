const UserLeave = require('../domain/entities/userLeave.entity.js');
const UserLeaveRepository = require('../repository/userLeave.repository');
const DeleteViewModel = require('../models/viewmodels/delete.view.model');

//Maybe singleton
const userLeaveRepository = new UserLeaveRepository;

exports.insert = (req, resp) => {
    if(Object.keys(req.body).length === 0) {
        resp.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const userLeave = new UserLeave({
        reason: req.body.reason,
        type: req.body.type,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    userLeaveRepository.insert(userLeave);
    resp.send({
        success: 'You"re information was successfully saved'
    });
}

exports.findAll = (req,res) => {
    userLeaveRepository.findAll((err, result) => {
        if(err) {
                res.status(500).send({
                error: 'Database problem, try again later ' || err.message
            });
            return;
        }

        res.send(result);
    });
}

exports.delete = (req, res) => {
    if(Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: 'Body content cannot be empty!'
        });
        return;
    }

    const userViewModel = new DeleteViewModel({
        id: req.body.id,
    })

   userLeaveRepository.delete(userViewModel.id, (err) => {
       console.log(err)
       if(err) {
           res.status(500).send({
               error: 'Database problem, try again later ' || err
           });
       }

       res.status(200).send({
           success: 'User leave with id = ' + userViewModel.id + ' is successfully removed '
       });
   });



}

