<template>
    <div class="recommend" ref="recommend">
        <scroll class="recommend-content" ref="scroll" :data="playList">  
            <div>
                <div class="decorate"></div>
                <div class="slider-wrapper">

                </div>
                <div class="recommend-list" ref="recommendList">
                    <h1 class="title">推荐歌单</h1>
                    <ul>
                        <li class="item" v-for="item in playList" :key="item.id" @click="selectList(item)">
                            <div class="icon">
                                <div class="gradients"></div>
                                <img v-lazy="item.picUrl">
                            </div>
                            <p class="play-count">
                                <i class="fa fa-headphons"></i>
                                {{Math.floor(item.playCount / 10000) }}万
                            </p>
                            <div class="text">
                                <p class="name">{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="recommend-newsong" ref="recommendNewSong">
                    <h1 class="title">最新音乐</h1>
                    <ul>
                        <li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
                            <div class="newsong-text">
                                <div class="name">
                                    {{item.name}}
                                    <span class="attach" v-if="item.aliaName">({{item.aliaName}})</span>
                                </div>
                                <div class="author">
                                    <i class="author-icon"></i>
                                    {{item.singer}}-{{item.name}}
                                </div>
                            </div>
                            <div class="newsong-play">
                                <span class="iconfont icon-bofangicon"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>    
</template>
<script>
import Scroll from 'base/scroll/scroll'
// import Slider from 'base/slider/slider'
import {getBanner, getRecommendList, getRecommendMusic} from 'api/recommend'
import {ERR_OK} from 'common/js/config'
import {createRecommendSong} from 'common/js/song'
import {mapMutations, mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
export default{
    mixins: [playlistMixin],
    data () {
        return {
            banner: [],
            playList: [],
            recommendMusic: []
        }
    },
    created() {
        this._getRecommendList()
        this._getRecommendMusic()
    },
    methods: {
        selectSong (item) {
            this.insertSong(item)
        },
        handlePlaylist (playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.recommend.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        selectList (item) {
            this.$router.push({
                path: `/recommend/${item.id}`
            })
            this.setMusicList(item)
        },
        _getRecommendList () {
            getRecommendList().then((res) => {
                if(res.status === ERR_OK) {
                    this.playList = res.data.result
                } else {
                    console.error('getRecommendList 获取失败')
                }
            })
        },
        _getRecommendMusic () {
            getRecommendMusic().then((res) => {
                
                if(res.status === ERR_OK) {
                    let list = res.data.result.map((item) => {
                        return createRecommendSong(item.song)
                    })
                    list.splice(9)
                    this.recommendMusic = list
                    console.log(this.recommendMusic)
                } else {
                    console.error('getRecommendMusic 获取失败')
                }
            })
        },
        ...mapMutations({
            setMusicList: 'SET_MUSIC_LIST',
            setFullScreen: 'SET_FULL_SCREEN'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    components: {
        Scroll
    }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/variable';
@import '~common/scss/mixin.scss';
.recommend{
    position:fixed;
    width:100%;
    top:88px;
    bottom:0;
    z-index:100;
    .recommend-content{
        width:100%;
        height:100%;
        overflow: hidden;
        .decorate{
            position:absolute;
            top:-30vh;
            z-index:-10;
            // background: $color-theme-t;
            width:100%;
            height:50vh;
            vertical-align: inherit;
        }
        .slider-wrapper{
            width:96%;
            margin:0 auto;
            border-radius: 5px;
            overflow: hidden;
        }
        .recommend-list{
            position:relative;
            box-sizing: border-box;
            width:100%;
            text-align:center;
            .title{
                height:40px;
                line-height:40px;
                padding-left:1.5%;
                text-align: left;
                font-size: $font-size-medium;
                font-weight: bold;
                color: $color-text;
                border-left:3px solid $color-theme;
            }
            .item{
                display:inline-block;
                position:relative;
                width:30%;
                padding:0 1%;
                .icon{
                    position:relative;
                    display:inline-block;
                    width: 100%;
                    margin-bottom:5px;
                    .gradients{
                        position:absolute;
                        top:0;
                        width:100%;
                        height:35px;
                        border-radius: 3px;
                        background: linear-gradient(rgba(109, 109, 109, 0.4), rgba(255,255,255,0));
                    }
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 3px;
                    }
                }
                .play-count{
                    position:absolute;
                    top:5px;
                    right: 8px;
                    font-size: $font-size-small-s;
                    color: $color-text-l;
                }
                .text{
                    float:left;
                    line-height: 16px;
                    text-align: left;
                    height:40px;
                    line-height: 16px;
                    overflow: hidden;
                    margin-bottom: 10px;
                    font-size: $font-size-small;
                }
            }
            
        }
        .recommend-newsong{
            margin-top: -20px;
            box-sizing: border-box;
            width: 100%;
            .title{
                height:40px;
                line-height: 40px;
                padding-left:1.5%;
                font-size:$font-size-medium;
                font-weight:bold;
                color:$color-text;
                border-left:3px solid $color-theme;
            }
            .item{
                display:flex;
                position:relative;
                flex:1 1 auto;
                padding-left:10px;
                height:55px;    
                &::after{
                    position: absolute;
                    z-index: 2;
                    content:'';
                    bottom:0;
                    left:0;
                    pointer-events: none;
                    box-sizing: border-box;
                    transform-origin: top left;
                    border-bottom: 1px solid rgba(0,0,0,.1);
                    width:200%;
                }
                .newsong-text{
                    flex:1;
                    padding:6px 0;
                    width:0;
                    .name{
                        line-height: 25px;
                        font-size:$font-size-large-s;
                        .attach{
                            color:#888;
                            margin-left:5px;
                        }
                    }
                    .author{
                        line-height:17px;
                        font-size:$font-size-small-x;
                        color:#888;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: normal;
                    }
                }
                .newsong-play{
                    padding:0 10px;
                    line-height: 55px;
                    .iconfont{
                        font-size:$font-size-large-x;
                        color:$color-text-icon;
                    }
                }

            }
        }
    }

}
</style>