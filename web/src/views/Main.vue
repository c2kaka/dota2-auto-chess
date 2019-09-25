<template>
  <div>
    <div class="top-bar bg-dark2 p-2 d-flex ai-center">
        <img src="../assets/logo.png" alt="" srcset="" height="30">
        <div class="flex-1 px-3">
            <div class="text-white fs-lg">刀塔自走棋</div>
            <div class="text-grey1 fs-md">运筹帷幄，决胜千里</div>
        </div>
        <div>
            <button type="button" class="button bg-primary ">立即下载</button>
        </div>
    </div>

    <div class="bg-primary pt-3 pb-2">
        <div class="nav d-flex jc-around text-white pb-1">
            <div class="nav-item active">
                <router-link to='/home' tag='div'>首页</router-link>
            </div>
            <div class="nav-item">
                <router-link to='/' tag='div'>攻略中心</router-link>
            </div>
            <div class="nav-item">
                <router-link to='/' tag='div'>资讯中心</router-link>
            </div>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>  
