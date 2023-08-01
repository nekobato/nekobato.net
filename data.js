import dayjs from "dayjs";

const experienceYears = dayjs().diff("2012-04-01", "year");

export const me = {
  name: "郡山 隼人",
  nameEn: "KORIYAMA Hayato",
  handle: "nekobato",
  company: "猫鳩柔工業",
  timezone: "Asia/Tokyo",
  role: "Web Frontend Engineer",
  email: "nekobato@gmail.com",
  phone: "090-7301-4492",
  website: "https://nekobato.net",
  github: "https://github.com/nekobato",
  twitter: "https://twitter.com/nekobato",
  linkedin: "https://www.linkedin.com/in/nekobato",
  summary: `I am a web frontend engineer with ${experienceYears}+ years of experience.`,
};

export const resume = {
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Node.js",
    "Express",
    // "Ruby on Rails",
    "Redis",
    // "Docker",
    // "Kubernetes",
    "Git",
    "GitHub",
  ],
  experiences: [
    // {
    //   company: "株式会社 U-NOTE",
    //   role: "業務委託",
    //   startDate: "2012-04",
    //   endDate: "2015-03",
    //   projects: [
    //     {
    //       name: "サービス立ち上げ〜運用",
    //       startDate: "2012-04",
    //       endDate: "2015-03",
    //       highlights: [
    //         "PHP(CodeIgniter)とjQueryでのサービス開発",
    //         "contenteditableとjQueryでのWYSIWYGエディタの開発",
    //       ],
    //     },
    //   ],
    // },
    // {
    //   company: "paytner株式会社",
    //   role: "業務委託",
    //   startDate: "2021-04",
    //   endDate: "",
    //   projects: [
    //     {
    //       name: "サービス立ち上げ〜運用",
    //       startDate: "2021-04",
    //       endDate: "",
    //       highlights: ["Nuxt.jsとTypeScriptでのサービス開発"],
    //     },
    //   ],
    // },
    {
      company: "株式会社モバイルファクトリー",
      role: "Webフロントエンドエンジニア",
      startDate: "2015-04",
      endDate: "2018-06",
      projects: [
        {
          name: "モバイル位置ゲームのフロントエンド設計・開発",
          startDate: "2015-04",
          endDate: "2017-12",
          highlights: [
            "Web技術によるスマートフォンゲーム開発",
            "Adobe XDを使った画面管理",
          ],
        },
        {
          summary: "ブロックチェーン新規開発",
          startDate: "2018-01",
          endDate: "2018-06",
          highlights: [
            "Solidityを使ったスマートコントラクト開発",
            "Node.jsを使ったブロックチェーン基盤開発",
          ],
        },
      ],
    },
    {
      company: "株式会社メルカリ",
      role: "Webフロントエンドエンジニア",
      startDate: "2018-07",
      endDate: "2018-12",
      projects: [
        {
          name: "管理画面開発運用",
          startDate: "2018-07",
          endDate: "2018-12",
          highlights: [
            "管理画面の新規機能開発",
            "レガシーコードリファクタリング",
          ],
        },
        {
          name: "サービスリニューアルにおけるDevOps",
          startDate: "2019-01",
          endDate: "2019-09",
          highlights: [
            "サーバーおよびエラー監視の構築",
            "Web版周辺のサーバー負荷検証とリファクタリング",
          ],
        },
        {
          name: "Design System Web",
          startDate: "2019-10",
          endDate: "2019-12",
          highlights: ["Design System Webの開発"],
        },
      ],
    },
    {
      company: "株式会社メルペイ",
      role: "Webフロントエンドエンジニア",
      startDate: "2020-01",
      endDate: "2020-09",
      projects: [
        {
          name: "Design System Web",
          startDate: "2020-01",
          endDate: "2020-09",
          highlights: ["Design System Webの開発"],
        },
      ],
    },
    {
      company: "株式会社メルカリ",
      role: "Webフロントエンドエンジニア",
      startDate: "2020-10",
      endDate: "2022-07",
      projects: [
        {
          name: "Design System Web",
          startDate: "2020-10",
          endDate: "2022-07",
          highlights: ["Design System Webの開発・運用"],
        },
      ],
    },
    {
      company: "株式会社RABO",
      role: "Webフロントエンドエンジニア",
      startDate: "2023-01",
      endDate: "",
      projects: [
        {
          name: "Catlog Web",
          startDate: "2023-01",
          endDate: "",
          highlights: [],
        },
      ],
    },
  ],
  educations: [
    {
      institution: "慶応義塾大学",
      area: "環境情報学部",
      studyType: "学士",
      startDate: "2009-04",
      endDate: "2013-03",
    },
    {
      institution: "慶応義塾大学",
      area: "政策・メディア学科 CIプログラム",
      studyType: "修士",
      startDate: "2013-04",
      endDate: "2015-03",
    },
  ],
};
