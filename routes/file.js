const router = require('express').Router();

router.get('/file/:filename', (req, res) => {
    res.send({ success: false });
});

router.post('/file', (req, res) => {
    res.send({ success: false });
});

module.exports = router;
