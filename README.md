#### 小程序脚手架工具

使用WebStrom编辑， 使用less代替原有wxss。

- 安装:
~~~
npm i wxx-cli -g
~~~

- 初始化项目
~~~
wxx-cli init projectName appId
~~~

- 安装依赖
~~~
cd projectName
npm install
~~~

- 启动项目
~~~
npm start
~~~

##### 配置WebStrom 支持wxml wxss 代码提示

+ 1、添加文件类型wxml 和 wxss. 点击 File - Settings - Editor - File Types;

  配置wxml, 选中html - 点击加号 - 填入*.wxml
    
<div align="center">
<img src="https://github.com/jiekekeji/my-notes/blob/master/%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%B0%8F%E7%A8%8B%E5%BA%8F-xxxx.png?raw=true" width="70%" >
</div>
    
   配置wxss, 选中Cascading Style Sheet - 点击加号 - 填入*.wxss
     
 <div align="center">
   <img src="https://github.com/jiekekeji/my-notes/blob/master/%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%B0%8F%E7%A8%8B%E5%BA%8F-xxxx.png?raw=true" width="70%" >
 </div>

+ 2 添加代码提示  [jar下载](https://raw.githubusercontent.com/jiekekeji/my-notes/master/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/wecharCode.jar)

    File -> import settings 选中下载的jar包 导入即可

+ 3 代码中webstorm中编辑，原有的微信开发者工具做模拟器和调试器。
