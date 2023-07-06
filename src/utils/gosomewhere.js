function GoPowerPredict() {
    this.isNavigator = false
    if (this.$route.path === "/PowerPredict") {
        this.$message.success('您已经在该界面了哦')
    } else this.$router.push("PowerPredict");
}

export { GoPowerPredict }
