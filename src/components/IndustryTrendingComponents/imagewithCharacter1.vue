<template>
  <div class="card card-1">
    <div class="content">
      <h2 class="title">{{ this.policy[this.policyOption].title }}</h2>
      <p class="copy">{{ this.policy[this.policyOption].intro }}</p>
      <button class="btn" @click="newPage">查看更多</button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "imagewithCharacter1",
  data() {
    return {
      policy: [
        {
          title: '《能源碳达峰碳中和标准化提升行动计划》的通知',
          intro: '为深入贯彻党中央、国务院关于碳达峰、碳中和的重大战略决策，充分发挥标准推动能源绿色低碳转型的技术支撑和引领性作用...',
          url: 'http://www.nea.gov.cn/2022-10/09/c_1310668927.htm',
        },
        {
          title: '《加快电力装备绿色低碳创新发展行动计划》',
          intro: '为深入贯彻落实党中央、国务院决策部署，认真贯彻新发展理念，...',
          url: 'https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2022/art_4ccbd89465cc4336b88b19a02bbf473b.html',
        },
        {
          title: '《扩大内需战略规划（2022-2035年）》',
          intro: '近年来，国内外形势错综复杂，我国外部环境不确定性增加...',
          url: 'https://www.gov.cn/zhengce/2022-12/14/content_5732067.htm',
        },
        {
          title: '《风起初春，风电轴承步入国产化深水区》',
          intro: '风电轴承作为风电机组的重要组成部分，一直以来都依赖进口...',
          url: 'https://baijiahao.baidu.com/s?id=1754869455306904874&wfr=spider&for=pc',
        }
      ]
    };
  },
  props: {
    policyOption: {
      type: Number,
      require: false,
      default: 0
    }
  },
  methods: {
    newPage() {
      window.open(this.policy[this.policyOption].url, '_blank'); // 请替换为你要跳转的外部链接
    }
  }
};
</script>
  
<style scoped>
* {
  box-sizing: border-box;
}

.card {
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  text-align: center;
  color: whitesmoke;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1);
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 0 0;
  transition: transform calc(0.7s * 1.5) cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
  background-image: url('@/assets/image/background/bg1.png');
}

.card:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.009) 11.7%, rgba(0, 0, 0, 0.034) 22.1%, rgba(0, 0, 0, 0.072) 31.2%, rgba(0, 0, 0, 0.123) 39.4%, rgba(0, 0, 0, 0.182) 46.6%, rgba(0, 0, 0, 0.249) 53.1%, rgba(0, 0, 0, 0.32) 58.9%, rgba(0, 0, 0, 0.394) 64.3%, rgba(0, 0, 0, 0.468) 69.3%, rgba(0, 0, 0, 0.54) 74.1%, rgba(0, 0, 0, 0.607) 78.8%, rgba(0, 0, 0, 0.668) 83.6%, rgba(0, 0, 0, 0.721) 88.7%, rgba(0, 0, 0, 0.762) 94.1%, rgba(0, 0, 0, 0.79) 100%);
  transform: translateY(-50%);
  transition: transform calc(0.7s * 2) cubic-bezier(0.19, 1, 0.22, 1);
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;
}

.content>*+* {
  margin-top: 1rem;
}

.title {
  font-size: 22px;
  font-weight: bold;
  line-height: 26px;
}

.copy {
  font-family: "Cardo", serif;
  font-size: 16px;
  font-style: italic;
  line-height: 22px;
}

.btn {
  cursor: pointer;
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: brown;
}

.btn:focus {
  outline: 1px dashed brown;
  outline-offset: 3px;
}

@media (hover: hover) and (min-width: 600px) {
  .card:after {
    transform: translateY(0);
  }

  .content {
    transform: translateY(calc(100% - 90px));
  }

  .content>*:not(.title) {
    opacity: 0;
    transform: translateY(1rem);
    transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .card:hover,
  .card:focus-within {
    align-items: center;
  }

  .card:hover:before,
  .card:focus-within:before {
    transform: translateY(-4%);
  }

  .card:hover:after,
  .card:focus-within:after {
    transform: translateY(-50%);
  }

  .card:hover .content,
  .card:focus-within .content {
    transform: translateY(0);
  }

  .card:hover .content>*:not(.title),
  .card:focus-within .content>*:not(.title) {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(0.7s / 8);
  }

  .card:focus-within:before,
  .card:focus-within:after,
  .card:focus-within .content,
  .card:focus-within .content>*:not(.title) {
    transition-duration: 0s;
  }
}
</style>
  

