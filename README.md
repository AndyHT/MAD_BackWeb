# MAD_BackWeb
Mad Back manage Web

## 配置
#### terminal
1. nodejs环境
2. npm install
3. bower install

#### webstorm
1. preferences/settings -> Languages & Frameworks -> Node.js and NPM -> 检查node是否安装，没有安装的话安装一下
2. 右上角configurations
  ![configure](http://cl.ly/0s203v3U0q0i/Image%202016-03-28%20at%2010.47.18%20%E4%B8%8B%E5%8D%88.png)
3. gulpfile.js右键 -> show gulp tasks -> 选serve或者其他task就好
4. 或者直接用webstorm集成的命令行
  ![terminal in webstorm](http://cl.ly/472p2y0K2n0x/Image%202016-03-28%20at%2010.49.34%20%E4%B8%8B%E5%8D%88.png)

##目录说明(网页源码全部在src目录下)
1. app/blank/blank.html

    空白html文件，用于在不需要ui-view的地方填充页面
    
2. app/components/footer/footer.html

    页脚html文件

3. app/components/header/*-header.html

    页面header，需要新的header时请在该目录下添加html文件，命名方式参见已有文件

4. app/components/navbar/navbar.html

    页面导航栏

5. app/components/sub-navbar/*-sub-navbar.html

    页面二级导航栏，需要新的导航栏时请在该目录下添加html文件，命名方式参见已有文件

6. app/login/*

    登录界面

7. app/user-list/*

    用户列表界面

## 界面说明
###1.登录
```
http://localhost:3000/#/login
```
####文件目录:app/login/*

###2. 用户列表
```
http://localhost:3000/#/
```
####文件目录:app/user-list/*