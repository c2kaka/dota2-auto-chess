module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true
  });

  router.post("/", async (req, res) => {
    const model = await req.model.create(req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    let queryOptions = {};
    const modelName = req.model.modelName;
    if (modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const model = await req.model
      .find()
      .setOptions(queryOptions)
      .limit(100);
    res.send(model);
  });

  router.get("/:id", async (req, res) => {
    const model = await req.model.findById(req.params.id);
    res.send(model);
  });

  router.put("/:id", async (req, res) => {
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/:id", async (req, res) => {
    await req.model.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    });
  });

  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.model = require(`../../models/${modelName}`);
      next();
    },
    router
  );

  //文件上传接口
  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads'});
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = 'http://localhost:3000/uploads/'+ file.filename;
    res.send(file);
  });
};
