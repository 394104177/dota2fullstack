<template>
  <div class="hero">
    <div class="hero_container text-center ">
      <header>
          <ul class="d-flex ai-center">
              <li ><router-link to='/heros/allHero'>所有英雄</router-link></li>
              <li ><router-link to='/heros/mostPlayed'>最多使用</router-link></li>
              <li><router-link to='/heros/rate'>胜率</router-link></li>
              <li><router-link to='/heros/kda'>KDA</router-link></li>
              <li><router-link to='/heros/cs'>正反补</router-link></li>
              <li><router-link to='/heros/gpm'>金钱/经验</router-link></li>
              <li><router-link to='/heros/dmg'>伤害/治疗</router-link></li>
          </ul>
      </header>
      <main style="min-height:1000px; width:1100px; margin: 0 auto; " >
        <keep-alive><router-view></router-view></keep-alive>
         
      </main>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
    .router-link-exact-active{
        background: linear-gradient(to top, rgb(26, 26, 26) 0%, rgb(35, 35, 35) 41%);
    }
  
</style>

