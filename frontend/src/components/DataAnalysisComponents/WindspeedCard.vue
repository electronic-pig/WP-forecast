<template>
    <div class="windspeed-card">
        <div class="text-container">
            <p class="bold-text">年平均风速</p>
            <p class="english-text">average windspeed</p>
            <p class="data-text">10.3m/s</p>
        </div>
        <div class="img-container">
            <img src="@/assets/image/windspeed.gif" alt="Weather" class="card-image">
        </div>
    </div>
</template>

<script>
export default {}
</script>
<style scoped>
.windspeed-card {
    height: 360px;
    width: 270px;
    background-color: white;
    border: 2px solid var(--theme--color);
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.text-container {
    text-align: left;
    margin-left: 10px;
    align-items: flex-start;
}

.windspeed-card:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.bold-text {
    line-height: 0%;
    font-size: larger;
    font-weight: bold;
}

.english-text {
    font-family: 'Arial', sans-serif;
    font-size: large;
    color: #b0abab;
}

.data-text {
    line-height: 0%;
    font-size: x-large;
    color: rgb(48, 178, 15);
}

.img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-image {
    width: 90%;
    height: 90%;
    object-fit: contain;
    display: block;
    margin: auto;
}
</style>