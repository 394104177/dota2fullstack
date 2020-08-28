<template>
  <div id="app">
    <div id="dota2_nav">
      <div id="nav_main">
        <div class="nav_content text-lightgrey">
            <ul class="clear d-flex ai-center">
                <img src="./assets/logo.png" alt="">
                <li><router-link to="/" class="text-center"><span>首页</span><span class="nav_link">HOME</span></router-link></li>
                <li><router-link to="/news" class="text-center"><span>资讯</span><span class="nav_link">NEWS</span></router-link></li>
                <li><router-link to="/data" class="text-center"><span>资料</span><span class="nav_link">DATA</span></router-link></li>
                <li><router-link to="/download" class="text-center"><span>下载</span><span class="nav_link">DOWNLOAD</span></router-link></li>
            </ul>
        </div>
      </div>
      <div id="nav_footer">
          <img src="./assets/nav_footer.jpg" alt="" >
          <img src="./assets/nav_footer.jpg" alt="" >
          <div class="mask"></div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
  
</style>
