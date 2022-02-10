var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/execute', function (req, res, next) {
  let template = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
      <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      <script type="text/babel" data-presets="react">
          ${req.body["data"]}
        </script>
      <title>Document</title>
    </head>
    <body>
      <style></style>
       <div id="root">something went wrong : (. Tip: Don't remove the "ReactDOM.render()";" from your script. </div>
    </body>
  </html>`;
  template = template.replace("_mount_", `document.getElementById("root")`)
  let response = {
    document : template
  }
  res.send(response);
});

module.exports = router;
