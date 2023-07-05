function gopowerPredict() {
    this.isNavigator = false
    if (this.$route.path === "/powerPredict") {
        this.$message.success('您已经在该界面了哦')
    } else this.$router.push("powerPredict");
}

export { gopowerPredict }
