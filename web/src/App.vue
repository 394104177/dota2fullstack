<template>
  <div id="app">
    <div id="dota2_nav">
      <div id="nav_main">
        <div class="nav_content text-lightgrey">
          <ul class="clear d-flex ai-center ">
            <img
              src="./assets/logo.png"
              alt=""
            />
            <li>
              <router-link
                to="/"
                class="text-center"
              ><span>首页</span><span class="nav_link">HOME</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/news"
                class="text-center"
              >
                <span>资讯</span><span class="nav_link">NEWS</span>
              </router-link>
              <div class="pop">
                <router-link to="/news/gameNews">官方新闻</router-link>
                <router-link to="/news/competition">赛事新闻</router-link>
                <router-link to="/news/gamePost">更新日志</router-link>
                <router-link to="/news/raider">游戏攻略</router-link>
              </div>
            </li>
            <li>
              <router-link
                to="/heros"
                class="text-center"
              >
                <span>资料</span>
                <span class="nav_link">DATA</span>
              </router-link>
              <div class="pop">
                <router-link to="/heros">英雄</router-link>
                <router-link to="/items">物品</router-link>
              </div>
            </li>
            <li>
              <router-link
                to="/download"
                class="text-center"
              ><span>下载</span><span class="nav_link">DOWNLOAD</span></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div id="nav_footer">
        <!-- <img
          src="./assets/nav_footer.jpg"
          alt=""
        />
        <img
          src="./assets/nav_footer.jpg"
          alt=""
        /> -->
        <div class="mask"></div>
      </div>
    </div>
    <div id="dota2_main"  style="min-height: 1000px">
      <router-view />
    </div>
    <div id="dota2_footer">
      <div
        title="回到顶部"
        class="footer_scrollup text-center"
        
      >
        <a class="text-white" href="#nav_main">^</a>
      </div>
      <div class="footer_footer"></div>
    </div>
  </div>
</template>

<style>
</style>
