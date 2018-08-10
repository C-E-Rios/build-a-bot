<template>
  <div v-if="availableParts" class="content">

    <div class="preview">
      <CollapsableSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torso.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsableSection>
      <button class="add-to-cart" @click="addToCart()">
        Add to cart
      </button>
    </div>

    <div class="top-row">
      <PartSelector
        :parts="availableParts.heads"
        position="top"
        @partSelected="selectedPart => selectedRobot.head = selectedPart "/>
    </div>
    <div class="middle-row">
      <PartSelector
        :parts="availableParts.arms"
        position="left"
        @partSelected="selectedPart => selectedRobot.leftArm = selectedPart "/>
      <PartSelector
        :parts="availableParts.torsos"
        position="center"
        @partSelected="selectedPart => selectedRobot.torso = selectedPart "/>
      <PartSelector
        :parts="availableParts.arms"
        position="right"
        @partSelected="selectedPart => selectedRobot.rightArm = selectedPart "/>
    </div>
    <div class="bottom-row">
      <PartSelector
        :parts="availableParts.bases"
        position="bottom"
        @partSelected="selectedPart => selectedRobot.base = selectedPart "/>
      <!-- <div class="bottom part">
        <img :src="selectedRobot.base.src" title="left arm"/>
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div> -->
    </div>

    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import PartSelector from './PartSelector.vue';
import CollapsableSection from '../shared/CollapsableSection.vue';

export default {
  name: 'RobotBuilder',
  created() {
    this.$store.dispatch('robots/getParts');
  },
  components: { PartSelector, CollapsableSection },
  data() {
    return {
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  computed: {
    availableParts() {
      return this.$store.state.robots.parts;
    },
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;

      const cost = robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;

      this.$store.dispatch('robots/addRobotToCart', Object.assign({}, robot, { cost }))
        .then(() => this.$router.push('/cart'));
    },
  },
  // beforeRouteLeave() {
  // Ask user if they want to leave
  // },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
  img {
    width:165px;
  }
}

.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border {
  border: 3px solid red;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}

</style>
