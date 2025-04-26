a = {
    meal: [
        {
            mealId: 75,
            mealConfig: {
                options: [
                    {
                        key: "尺寸",
                        value: "",
                    },
                ],
            },
            customConfig: [
                {
                    options: [
                        {
                            TemplateID: "80",
                            content: [
                                {
                                    title: "薯條",
                                    extra: "70",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            mealId: 75,
            mealConfig: {
                options: [
                    {
                        key: "尺寸",
                        value: "",
                    },
                ],
            },
            customConfig: [
                {
                    options: [
                        {
                            TemplateID: "80",
                            content: [],
                        },
                    ],
                },
            ],
        },
        {
            mealId: 75,
            mealConfig: {
                options: [
                    {
                        key: "尺寸",
                        value: "",
                    },
                ],
            },
            customConfig: [
                {
                    options: [
                        {
                            TemplateID: "80",
                            content: [
                                {
                                    title: "洋蔥圈",
                                    extra: "90",
                                },
                                {
                                    title: "薯條",
                                    extra: "70",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            mealId: 74,
            mealConfig: {
                options: [
                    {
                        key: "尺寸",
                        value: "",
                    },
                ],
            },
            customConfig: [
                {
                    options: [
                        {
                            TemplateID: "79",
                            content: [
                                {
                                    title: "正常",
                                    extra: "0",
                                },
                            ],
                        },
                        {
                            TemplateID: "78",
                            content: [
                                {
                                    title: "去冰",
                                    extra: "0",
                                },
                            ],
                        },
                        {
                            TemplateID: "81",
                            content: [
                                {
                                    title: "小芋圓",
                                    extra: "30",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            mealId: 72,
            mealConfig: {
                options: [
                    {
                        key: "尺寸",
                        value: "大杯",
                    },
                ],
            },
            customConfig: [
                {
                    options: [
                        {
                            TemplateID: "78",
                            content: [
                                {
                                    title: "微冰",
                                    extra: "0",
                                },
                            ],
                        },
                        {
                            TemplateID: "79",
                            content: [
                                {
                                    title: "半糖",
                                    extra: "0",
                                },
                            ],
                        },
                        {
                            TemplateID: "81",
                            content: [
                                {
                                    title: "布丁",
                                    extra: "50",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

x = {
    meal: [
        {
            mealId: 26,
            mealConfig: {
                options: [
                    {
                        key: "尺寸",
                        value: "大",
                    },
                    {
                        key: "甜度",
                        value: "半糖",
                    },
                ],
            },
            customConfig: [
                {
                    options: [
                        {
                            TemplateID: "10",
                            content: [
                                {
                                    title: "去冰",
                                    extra: "0",
                                },
                            ],
                        },
                        {
                            TemplateID: "64",
                            content: [
                                {
                                    title: "珍珠",
                                    extra: "0",
                                },
                                {
                                    title: "布丁",
                                    extra: "0",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

console.log(
    JSON.parse(
        '{"meal":[{"mealId":26,"mealConfig":{"options":[{"key":"尺寸","value":"大"},{"key":"甜度","value":"半糖"}]},"customConfig":[{"options":[{"TemplateID":"10","content":[{"title":"去冰","extra":"0"}]},{"TemplateID":"64","content":[{"title":"珍珠","extra":"0"},{"title":"布丁","extra":"0"}]}]}]}]}'
    )
);
