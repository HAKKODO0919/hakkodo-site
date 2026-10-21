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
      // 日本語の本文は、2026-10-21 に、現在の文章に変更。ca・es・en は、まだ、以前の短い文章のままです。
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
              { text: "毎年ご用意できる数に限りがあり、一般のお客様には年間200ポット限定でお届けしています。", bold: true }
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
          { text: "私は日本で管理栄養士として、さまざまな食の現場に携わってきました。日本の家庭料理やフランス菓子に関わる経験を経て、今はスペイン・カタルーニャで、日本の伝統的な発酵文化を大切にしながら味噌を仕込んでいます。", bold: false }
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
      storageWarning: [
        { text: "生味噌のため、酵母が生きています。", bold: true },
        { text: "発酵が進みやすいため、冷蔵庫で保存してください。", bold: true }
      ],
      storageMethod: "味噌本来の発酵を大切にしているため、保存中も温度によって発酵が進むことがあります。\n\n開封前は直射日光を避け、涼しい場所で保存してください。より良い状態で味噌をお楽しみいただくなら、開封前から冷蔵保存することをおすすめします。\n\n開封後は必ず冷蔵庫で保存してください。",
      bestBefore: [
        { text: "賞味期限は、瓶詰めから1年を目安としています。", bold: true },
        { text: "味噌は発酵・熟成が続く食品のため、保存状態や時間の経過によって、色や香り、味わいが少しずつ変化します。\nその変化も、生味噌ならではの味わいとしてお楽しみください。", bold: false }
      ]
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
              { text: "Elaborat durant l'època més freda de l'any, entre el solstici d'hivern i l'inici de la primavera, segons el mètode tradicional del “kan-jikomi”.", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "Koji d'arròs artesanal, elaborat amb fong koji japonès",
            body: [
              { text: "Fem servir fong koji d'una casa productora japonesa de llarga trajectòria i elaborem el koji d'arròs a mà, enmig de la natura de l'Alta Garrotxa.", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "Més d'un any de fermentació i maduració",
            body: [
              { text: "Sense pasteurització (tractament tèrmic) ni alcohol per aturar la fermentació, deixem que el miso fermenti i maduri lentament, confiant en la força de la natura i en el pas del temps.", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "Producció en petites quantitats",
            body: [
              { text: "Seguim el mètode tradicional i només elaborem el miso durant un període limitat cada any; per això, la quantitat disponible és limitada.", bold: true }
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
          { text: "Vaig treballar al Japó com a dietista-nutricionista titulada en diversos àmbits relacionats amb l'alimentació. Després d'una experiència vinculada a la cuina casolana japonesa i la rebosteria francesa, ara elaboro miso a Catalunya (Espanya), tot valorant la cultura tradicional japonesa de la fermentació.", bold: false }
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
      storageWarning: [
        { text: "Com que és miso cru, encara és viu.", bold: true },
        { text: "La fermentació pot avançar fàcilment, per això cal conservar-lo a la nevera.", bold: true }
      ],
      storageMethod: "Com que valorem la fermentació natural del miso, aquest pot continuar fermentant durant l'emmagatzematge segons la temperatura.\n\nAbans d'obrir-lo, cal conservar-lo en un lloc fresc, allunyat de la llum solar directa. Per gaudir-ne en les millors condicions, recomanem conservar-lo a la nevera fins i tot abans d'obrir-lo.\n\nUn cop obert, cal conservar-lo sempre a la nevera.",
      bestBefore: [
        { text: "La data de consum preferent és d'aproximadament un any des de l'envasat.", bold: true },
        { text: "Com que el miso continua fermentant i madurant, el seu color, aroma i sabor canviaran gradualment segons les condicions d'emmagatzematge i el pas del temps.\nAquest canvi també forma part del caràcter propi del miso cru.", bold: false }
      ]
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
              { text: "Elaborado durante la época más fría del año, entre el solsticio de invierno y el inicio de la primavera, según el método tradicional del “kan-jikomi”.", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "Koji de arroz artesanal, elaborado con hongo koji japonés",
            body: [
              { text: "Usamos hongo koji de una casa productora japonesa de larga trayectoria y elaboramos el koji de arroz a mano, en plena naturaleza de la Alta Garrotxa.", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "Más de un año de fermentación y maduración",
            body: [
              { text: "Sin pasteurización (tratamiento térmico) ni alcohol para detener la fermentación, dejamos que el miso fermente y madure con calma, confiando en la fuerza de la naturaleza y en el paso del tiempo.", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "Producción en pequeñas cantidades",
            body: [
              { text: "Seguimos el método tradicional y solo elaboramos el miso durante un periodo limitado cada año; por eso, la cantidad disponible es limitada.", bold: true }
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
          { text: "Trabajé en Japón como dietista-nutricionista titulada en diversos ámbitos relacionados con la alimentación. Tras una experiencia vinculada a la cocina casera japonesa y la repostería francesa, ahora elaboro miso en Cataluña (España), valorando la cultura tradicional japonesa de la fermentación.", bold: false }
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
      storageWarning: [
        { text: "Como es miso crudo, sigue vivo.", bold: true },
        { text: "La fermentación puede avanzar fácilmente, por eso hay que conservarlo en la nevera.", bold: true }
      ],
      storageMethod: "Como valoramos la fermentación natural del miso, este puede seguir fermentando durante el almacenamiento según la temperatura.\n\nAntes de abrirlo, conviene conservarlo en un lugar fresco, alejado de la luz solar directa. Para disfrutarlo en las mejores condiciones, recomendamos conservarlo en el refrigerador incluso antes de abrirlo.\n\nUna vez abierto, debe conservarse siempre en el refrigerador.",
      bestBefore: [
        { text: "La fecha de consumo preferente es de aproximadamente un año desde el envasado.", bold: true },
        { text: "Como el miso continúa fermentando y madurando, su color, aroma y sabor cambiarán gradualmente según las condiciones de almacenamiento y el paso del tiempo.\nEse cambio también forma parte del carácter propio del miso crudo.", bold: false }
      ]
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
              { text: "Made during the coldest time of the year, between the winter solstice and the first day of spring, in the traditional method known as “kan-jikomi.”", bold: true }
            ]
          },
          {
            icon: "rice",
            heading: "Handmade Rice Koji, Grown with Japanese Koji Mold",
            body: [
              { text: "We use koji mold from a long-established koji maker in Japan, and make our rice koji by hand amid the rich nature of Alta Garrotxa.", bold: true }
            ]
          },
          {
            icon: "clock",
            heading: "Over a Year of Fermentation and Aging",
            body: [
              { text: "With no heat treatment (pasteurization) or alcohol to stop fermentation, we leave the miso to ferment and age slowly, entrusting it to the power of nature and time.", bold: true }
            ]
          },
          {
            icon: "jar",
            heading: "Small-Batch Production",
            body: [
              { text: "We follow traditional methods and brew only during a limited season each year, so the quantity we can offer is limited.", bold: true }
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
          { text: "In Japan, I worked as a registered dietitian across a variety of food-related settings. After experience connected to Japanese home cooking and French pastry, I now make miso in Catalonia, Spain, while cherishing Japan's traditional fermentation culture.", bold: false }
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
      storageWarning: [
        { text: "This is raw miso, so it's still alive.", bold: true },
        { text: "Fermentation can progress easily, so please store it in the refrigerator.", bold: true }
      ],
      storageMethod: "Because we value miso's natural fermentation, it may continue to ferment during storage depending on the temperature.\n\nBefore opening, keep it away from direct sunlight in a cool place. For the best quality, we recommend refrigerating it even before opening.\n\nAfter opening, please always store it in the refrigerator.",
      bestBefore: [
        { text: "The best-before period is approximately one year from bottling.", bold: true },
        { text: "Since miso continues to ferment and age, its color, aroma, and flavor will gradually change depending on storage conditions and time.\nWe hope you'll enjoy that change as part of the character of raw miso.", bold: false }
      ]
    }
  }
};
