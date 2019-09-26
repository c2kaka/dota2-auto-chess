module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");
  const Article = require("../../models/Article");
  const Hero = require("../../models/Hero");
  //新闻列表接口
  router.get("/news/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类"
    });

    //获取新闻分类下的所有子分类的文章
    const categories = await Category.aggregate([
      {
        $match: { parent: parent._id }
      },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ]);

    const idGroup = categories.map(v => v._id);

    //在新闻列表数组头部加入热门分类
    categories.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: idGroup }
        })
        .populate("categories")
        .limit(5)
        .lean()
    });

    //封装前端所需数据
    categories.map(category => {
      category.newsList.map(news => {
        news.categoryName =
          category.name === "热门" ? news.categories[0].name : category.name;
        return news;
      });
      return category;
    });

    res.send(categories);
  });

  //英雄列表接口
  router.get("/heroes/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "英雄分类"
    });

    //获取新闻分类下的所有子分类的文章
    const categories = await Category.aggregate([
      {
        $match: { parent: parent._id }
      },
      {
        $lookup: {
          from: "heroes",
          localField: "_id",
          foreignField: "categories",
          as: "heroList"
        }
      }
    ]);

    const idGroup = categories.map(v => v._id);

    //在新闻列表数组头部加入热门分类
    categories.unshift({
      name: "热门",
      heroList: await Hero.find()
        .where({
          categories: { $in: idGroup }
        })
        .populate("categories")
        .limit(8)
        .lean()
    });

    res.send(categories);
  });

  app.use("/web/api", router);
};
