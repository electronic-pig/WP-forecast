class GoPowerPredict {
    constructor() {
        this.isNavigator = false;
        if (this.$route.path === "/PowerPredict") {
            this.$message.success('您已经在该界面了哦');
        } else this.$router.push("PowerPredict");
    }
}
class GoDataAnalysis {
    constructor() {
        this.isNavigator = false;
        if (this.$route.path === "/DataAnalysis") {
            this.$message.success('您已经在该界面了哦');
        } else this.$router.push("DataAnalysis");
    }
}
class GoIndustryTrending {
    constructor() {
        this.isNavigator = false;
        if (this.$route.path === "/IndustryTrending") {
            this.$message.success('您已经在该界面了哦');
        } else this.$router.push("IndustryTrending");
    }
}
export { GoPowerPredict, GoDataAnalysis, GoIndustryTrending }

