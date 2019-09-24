module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true
  });
  const AdminUser = require("../../models/AdminUser");
  const jwt = require("jsonwebtoken");
  const assert = require('http-assert');

  const authMiddleware = require('../../middleware/authMiddleware');
  const resourceMiddleware = require('../../middleware/resourceMiddleware');

  // 新建资源
  router.post("/", async (req, res) => {
    const model = await req.model.create(req.body);
    res.send(model);
  });

  // 查询资源列表
  router.get(
    "/",
    async (req, res) => {
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
    }
  );

  // 查询资源
  router.get("/:id", async (req, res) => {
    const model = await req.model.findById(req.params.id);
    res.send(model);
  });

  // 修改资源
  router.put("/:id", async (req, res) => {
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除资源
  router.delete("/:id", async (req, res) => {
    await req.model.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    });
  });

  // 通用接口中间件
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  //文件上传接口
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post("/admin/api/upload", authMiddleware(), upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = "http://localhost:3000/uploads/" + file.filename;
    res.send(file);
  });

  //登录接口
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    //判断用户名是否存在
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, '用户名不存在！');

    assert(password, 422, '请输入密码！');

    //校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, '密码错误！');

    //返回token
    const token = jwt.sign({ id: user._id }, app.get("privateKey"));
    res.send({ token });
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message || 'error!'
    })
  })
};
