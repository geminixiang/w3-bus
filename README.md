# w3

[Demo](https://w3-bus.herokuapp.com/)

## <font color="#dd0000">僅限台北</font>

推薦使用下述方法更改 GPS 位置
台北市政府
25.0382213, 121.5615046

![Alt text](/img/busChangeGps.gif)

## 技術使用

```
Vue3 - JS framework
vue3-carousel - Vue 字卡
tailwindcss - css library
axios - 用於請求 API
express - web 框架
hammerjs - 網頁手勢 JavaScript library
jssha - SHA 加密使用
leaflet - 開源的地圖 JavaScript library
leaflet.locatecontrol - 支援 leaflet 定位按鈕
Heroku - 提供 Vue 架站伺服器服務
```

# 檔案介紹

```
Home.vue 主頁 - 負責地圖定義、GPS定位、附近站牌取得
/components/Bus.vue - 負責取得指定站牌公車資訊
/components/Route.vue - 負責取得指定公車路線資訊
```
