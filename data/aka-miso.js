// 熟成味噌(赤味噌)の内容データ。ここを編集するとページの内容が変わります。
// URL(products/miso のページアドレス)には影響しません。
//
// 日本語(ja) / Català(ca) / Español(es) / English(en) の4言語分を用意しています。
window.PRODUCT_DATA = {
  images: {
    hero: "images/aka-miso/home-feature-miso-v4.jpg",
    gallery: [
      "images/aka-miso/photo2-v2.jpg",
      "images/aka-miso/photo3-v2.jpg",
      "images/aka-miso/photo1-v4.jpg"
    ]
  },
  updatedAt: "2026-09-01",
  translations: {
    ja: {
      name: "HAKKODO MISO｜熟成赤味噌",
      descriptionLine1: "いつもの一皿に、味噌の奥深い味わいを。",
      tagline: "米麹から丁寧に育てる、HAKKODOの味噌。",
      price: "12.50€",
      netWeight: "300g",
      heroAlt: "熟成味噌(赤味噌)のメイン写真",
      galleryAlt: [
        "熟成味噌(赤味噌)の写真1",
        "熟成味噌(赤味噌)の写真2",
        "熟成味噌(赤味噌)の写真3"
      ],
      // 「こだわり」セクション。4つのブロック(アイコン+見出し+本文)と、最後の締めの言葉。
      // 各ブロックの icon は、見出しの上に置く線画アイコンの種類(assets/product.js の STORY_ICONS)。
      //   snow(雪の結晶)/ rice(稲穂)/ clock(時計)/ jar(蓋つきの瓶)。省略すると、アイコンなし。
      // 4つのブロックは、PCでは2列×2行、スマホでは縦1列の、細い線で囲んだ項目になります(assets/style.css)。
      // body の各行は { text, bold } の形。bold: true の行だけ、見出しのように太字で表示されます。
      // 4言語とも、同じ内容です(日本語の文章に合わせて、ca・es・en を変更)。見出しは、日本語に合わせて、ca・es・en も短くしてあります。
      // 4つ目の「少量生産」は、限られた季節に仕込むため、毎年の量に限りがある、という内容(数量の数字は載せない)。
      story: {
        blocks: [
          {
            icon: "snow",
            heading: "寒仕込み",
            body: [
              { text: "一年で最も寒い時期に仕込む、昔ながらの「寒仕込み」。冬至から立春までの限られた期間に仕込みます。", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "日本の麹菌",
            body: [
              { text: "日本の老舗麹屋から取り寄せた麹菌を使い、自然豊かなアルタガロチャで米麹から丁寧に育てています。", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "1年以上の熟成",
            body: [
              { text: "加熱処理やアルコールによる発酵止めを行わず、自然の力と時間に委ねてじっくりと発酵・熟成をさせています。", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "少量生産",
            body: [
              { text: "限られた季節に仕込むため、毎年ご用意できる量には限りがあります。", bold: true }
            ]
          }
        ],
        closing: {
          main: "旨味の世界へようこそ。"
        }
      },
      // 「作り手について」セクション。小さめの似顔絵 + 経歴の文章。
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "作り手の似顔絵" },
        body: [
          { text: "私は日本の大学で食文化を学び、管理栄養士として食に向き合ってきました。料理教室で家庭料理を教え、お菓子づくりにも携わってきた経験を経て、現在はスペイン・カタルーニャで、日本の伝統的な発酵文化を大切にしながら味噌を仕込んでいます。", bold: false }
        ],
        // 本文の最後に表示するブランド署名(ロゴ+タグライン+メール)
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["米麹(米、麹菌)", "大豆", "海塩"],
      ingredientsNote: "米・大豆・塩は有機認証原料を使用しています。",
      allergens: ["大豆"],
      // 保存方法: intro(導入文)+ items(アイコン・見出し・説明の3項目)。icon は sun / fridge / jarOpen。日本語の文の「|」は、折り返してよい文節の切れ目(画面に「|」は出ない)
      storage: {
        items: [
          { icon: "sun", label: "開封前", text: "生味噌は保存中も|発酵が進みます。|ご購入後は|品質を|良い状態に|保つため、|ご家庭では|冷蔵保存を|おすすめします。" },
          { icon: "jarOpen", label: "開封後", text: "必ず冷蔵庫で保存してください。" }
        ]
      },
      // 賞味期限: value(目立たせる期間)+ note(補足。1文ずつ、別の行になる)
      bestBeforeInfo: {
        value: "瓶詰めから約1年",
        note: ["保存状態や|時間の経過により、|色・香り・|味わいが|変化することが|あります。", "生味噌|ならではの|自然な|変化です。"]
      }
    },
    ca: {
      name: "HAKKODO MISO｜Miso vermell madurat",
      descriptionLine1: "Un toc de sabor profund de miso per al plat de cada dia.",
      tagline: "El miso de HAKKODO, elaborat amb cura a partir del koji d'arròs.",
      price: "12,50 €",
      netWeight: "300g",
      heroAlt: "Foto principal del miso vermell madurat",
      galleryAlt: [
        "Foto 1 del miso vermell madurat",
        "Foto 2 del miso vermell madurat",
        "Foto 3 del miso vermell madurat"
      ],
      story: {
        blocks: [
          {
            icon: "snow",
            heading: "Elaboració d'hivern (kan-jikomi)",
            body: [
              { text: "Elaborat en l'època més freda de l'any, segons el mètode tradicional del “kan-jikomi”. Es prepara durant el període limitat que va del solstici d'hivern a l'inici de la primavera.", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "Fong koji japonès",
            body: [
              { text: "Utilitzem un fong koji que fem venir d'una casa productora japonesa de llarga trajectòria, i fem créixer amb cura el koji d'arròs a partir de l'arròs, enmig de la natura de l'Alta Garrotxa.", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "Més d'un any de maduració",
            body: [
              { text: "Sense tractament tèrmic ni alcohol per aturar la fermentació, deixem que el miso fermenti i maduri amb calma, confiant en la força de la natura i en el pas del temps.", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "Producció en petites quantitats",
            body: [
              { text: "Com que només s'elabora en una època concreta de l'any, la quantitat disponible cada any és limitada.", bold: true }
            ]
          }
        ],
        closing: {
          main: "Benvinguts al món de l'umami."
        }
      },
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "Retrat il·lustrat de la creadora" },
        body: [
          { text: "Vaig estudiar cultura alimentària en una universitat del Japó i m'he dedicat a l'alimentació com a dietista-nutricionista titulada. Després d'ensenyar cuina casolana en classes de cuina i de dedicar-me també a l'elaboració de dolços, ara elaboro miso a Catalunya (Espanya), tot valorant la cultura tradicional japonesa de la fermentació.", bold: false }
        ],
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["Koji d'arròs (arròs, fong koji)", "Soja", "Sal marina"],
      ingredientsNote: "L'arròs, la soja i la sal són ingredients certificats ecològics.",
      allergens: ["Soja"],
      // 保存方法: intro(導入文)+ items(アイコン・見出し・説明の3項目)。icon は sun / fridge / jarOpen。日本語の文の「|」は、折り返してよい文節の切れ目(画面に「|」は出ない)
      storage: {
        items: [
          { icon: "sun", label: "Abans d'obrir", text: "El miso cru continua fermentant durant la conservació. Un cop comprat, per mantenir-ne la qualitat, recomanem conservar-lo a la nevera a casa." },
          { icon: "jarOpen", label: "Després d'obrir", text: "Cal conservar-lo sempre a la nevera." }
        ]
      },
      // 賞味期限: value(目立たせる期間)+ note(補足。1文ずつ、別の行になる)
      bestBeforeInfo: {
        value: "Aproximadament 1 any des de l'envasat",
        note: ["El color, l'aroma i el sabor poden canviar segons les condicions de conservació i el pas del temps.", "És un canvi natural propi del miso cru."]
      }
    },
    es: {
      name: "HAKKODO MISO｜Miso rojo madurado",
      descriptionLine1: "Un toque de sabor profundo de miso para el plato de cada día.",
      tagline: "El miso de HAKKODO, elaborado con esmero a partir del koji de arroz.",
      price: "12,50 €",
      netWeight: "300g",
      heroAlt: "Foto principal del miso rojo madurado",
      galleryAlt: [
        "Foto 1 del miso rojo madurado",
        "Foto 2 del miso rojo madurado",
        "Foto 3 del miso rojo madurado"
      ],
      story: {
        blocks: [
          {
            icon: "snow",
            heading: "Elaboración de invierno (kan-jikomi)",
            body: [
              { text: "Elaborado en la época más fría del año, según el método tradicional del “kan-jikomi”. Se prepara durante el periodo limitado que va del solsticio de invierno al inicio de la primavera.", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "Hongo koji japonés",
            body: [
              { text: "Usamos un hongo koji que hacemos llegar desde una casa productora japonesa de larga trayectoria, y cultivamos con esmero el koji de arroz a partir del arroz, en plena naturaleza de la Alta Garrotxa.", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "Más de un año de maduración",
            body: [
              { text: "Sin tratamiento térmico ni alcohol para detener la fermentación, dejamos que el miso fermente y madure con calma, confiando en la fuerza de la naturaleza y en el paso del tiempo.", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "Producción en pequeñas cantidades",
            body: [
              { text: "Como solo se elabora en una época concreta del año, la cantidad disponible cada año es limitada.", bold: true }
            ]
          }
        ],
        closing: {
          main: "Bienvenidos al mundo del umami."
        }
      },
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "Retrato ilustrado de la creadora" },
        body: [
          { text: "Estudié cultura alimentaria en una universidad de Japón y me he dedicado a la alimentación como dietista-nutricionista titulada. Tras enseñar cocina casera en clases de cocina y dedicarme también a la elaboración de dulces, ahora elaboro miso en Cataluña (España), valorando la cultura tradicional japonesa de la fermentación.", bold: false }
        ],
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["Koji de arroz (arroz, hongo koji)", "Soja", "Sal marina"],
      ingredientsNote: "El arroz, la soja y la sal son ingredientes certificados ecológicos.",
      allergens: ["Soja"],
      // 保存方法: intro(導入文)+ items(アイコン・見出し・説明の3項目)。icon は sun / fridge / jarOpen。日本語の文の「|」は、折り返してよい文節の切れ目(画面に「|」は出ない)
      storage: {
        items: [
          { icon: "sun", label: "Antes de abrir", text: "El miso crudo sigue fermentando durante el almacenamiento. Una vez comprado, para mantener su calidad, recomendamos conservarlo en el refrigerador en casa." },
          { icon: "jarOpen", label: "Después de abrir", text: "Debe conservarse siempre en el refrigerador." }
        ]
      },
      // 賞味期限: value(目立たせる期間)+ note(補足。1文ずつ、別の行になる)
      bestBeforeInfo: {
        value: "Aproximadamente 1 año desde el envasado",
        note: ["El color, el aroma y el sabor pueden cambiar según las condiciones de almacenamiento y el paso del tiempo.", "Es un cambio natural propio del miso crudo."]
      }
    },
    en: {
      name: "HAKKODO MISO｜Aged Red Miso",
      descriptionLine1: "A deep miso flavor for your everyday dish.",
      tagline: "HAKKODO's miso, carefully crafted from rice koji.",
      price: "12.50€",
      netWeight: "300g",
      heroAlt: "Main photo of the aged red miso",
      galleryAlt: [
        "Photo 1 of the aged red miso",
        "Photo 2 of the aged red miso",
        "Photo 3 of the aged red miso"
      ],
      story: {
        blocks: [
          {
            icon: "snow",
            heading: "Cold-Season Preparation (Kan-jikomi)",
            body: [
              { text: "Made during the coldest time of the year, in the traditional method known as “kan-jikomi.” It is prepared within the limited period between the winter solstice and the first day of spring.", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "Japanese Koji Mold",
            body: [
              { text: "We use koji mold ordered from a long-established koji maker in Japan, and carefully grow our rice koji from the rice amid the rich nature of Alta Garrotxa.", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "Over a Year of Aging",
            body: [
              { text: "With no heat treatment or alcohol to stop fermentation, we leave the miso to ferment and age slowly, entrusting it to the power of nature and time.", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "Small-Batch Production",
            body: [
              { text: "Because it is made only in a particular season, the quantity available each year is limited.", bold: true }
            ]
          }
        ],
        closing: {
          main: "Welcome to the world of umami."
        }
      },
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "Portrait illustration of the maker" },
        body: [
          { text: "I studied food culture at a university in Japan and have worked with food as a registered dietitian. After teaching home cooking in cooking classes and also making sweets, I now make miso in Catalonia, Spain, while cherishing Japan's traditional fermentation culture.", bold: false }
        ],
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["Rice koji (rice, koji mold)", "Soybeans", "Sea salt"],
      ingredientsNote: "The rice, soybeans, and salt are certified organic ingredients.",
      allergens: ["Soybeans"],
      // 保存方法: intro(導入文)+ items(アイコン・見出し・説明の3項目)。icon は sun / fridge / jarOpen。日本語の文の「|」は、折り返してよい文節の切れ目(画面に「|」は出ない)
      storage: {
        items: [
          { icon: "sun", label: "Before opening", text: "Raw miso keeps fermenting during storage. After purchase, to keep it in good condition, we recommend storing it in the refrigerator at home." },
          { icon: "jarOpen", label: "After opening", text: "Always store in the refrigerator." }
        ]
      },
      // 賞味期限: value(目立たせる期間)+ note(補足。1文ずつ、別の行になる)
      bestBeforeInfo: {
        value: "About 1 year from bottling",
        note: ["Color, aroma, and flavor may change depending on storage conditions and time.", "This is a natural change unique to raw miso."]
      }
    }
  }
};
