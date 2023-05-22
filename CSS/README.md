# CSS

**覆盖组件样式**

```
.info-config-image-card:global(.image-card-list) { // image-card-list 为组件样式 info-config-image-card 为覆盖样式 这种写法会使权重变高
  margin-right: -32px ;


  :global { // image-card为组件样式

    .image-card {
      width: 207px;
    }
  }
}

```

