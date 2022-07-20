export const qiankun = async () => {
  return {
    // 注册子应用信息
    apps: [
      {
        name: 'ktian-material', // 唯一 id
        entry: process.env.NODE_ENV === 'development' ? '//localhost:8000' : '', // html entry
      },
    ],
    // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
    lifeCycles: {},
    // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
  };
};
