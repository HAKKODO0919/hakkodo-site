// 熟成味噌(赤味噌)の内容データ。ここを編集するとページの内容が変わります。
// URL(products/aka-miso のページアドレス)には影響しません。
//
// 日本語(ja) / Català(ca) / Español(es) / English(en) の4言語分を用意しています。
window.PRODUCT_DATA = {
  images: {
    hero: "images/aka-miso/main.jpg",
    gallery: [
      "images/aka-miso/photo2.jpg",
      "images/aka-miso/photo3.jpg",
      "images/aka-miso/photo1.png"
    ]
  },
  updatedAt: "2026-09-01",
  translations: {
    ja: {
      name: "熟成生味噌(赤味噌)",
      tagline: "米麹づくりから仕込みまで、ひとつひとつ\n時間をかけて丁寧に育てた昔ながらのお味噌です。",
      price: "12.50€",
      netWeight: "300g",
      heroAlt: "熟成味噌(赤味噌)のメイン写真",
      galleryAlt: [
        "熟成味噌(赤味噌)の写真1",
        "熟成味噌(赤味噌)の写真2",
        "熟成味噌(赤味噌)の写真3"
      ],
      // 「こだわり」セクション。5つのブロック(見出し+本文)と、最後の締めの言葉。
      // body の各行は { text, bold } の形。bold: true の行だけ、見出しのように太字で表示されます。
      story: {
        blocks: [
          {
            heading: "① 寒仕込み",
            body: [
              { text: "一年の中で最も寒い時期に仕込む、昔ながらの「寒仕込み」。", bold: true }
            ]
          },
          {
            heading: "② 伝統的な仕込み方法",
            body: [
              { text: "冬至から立春までの限られた期間に仕込みます。", bold: true },
              { text: "味噌をはじめ、酒や醤油などの発酵食品にも古くから受け継がれてきた、伝統的な仕込み方法です。", bold: false }
            ]
          },
          {
            heading: "③ 1年以上の発酵・熟成",
            body: [
              { text: "麹菌の働きを生かし、加熱処理（火入れ）やアルコールなどによる発酵止めを行わず発酵・熟成させています。", bold: true }
            ]
          },
          {
            heading: "④ 日本の麹菌で育てる手作り米麹",
            body: [
              { text: "日本の老舗麹屋から取り寄せた伝統的な麹菌を使い、自然豊かなアルタガロチャで丁寧に育てた米麹を使用しています。", bold: true }
            ]
          },
          {
            heading: "⑤ 少量生産",
            body: [
              { text: "伝統的な製法を守り、限られた仕込み期間に仕込むため、毎年ご用意できる数には限りがあります。", bold: true }
            ]
          }
        ],
        closing: {
          main: "いつもの食卓に、彩りと豊かさを。"
        }
      },
      // 「作り手について」セクション。小さめの似顔絵 + 経歴の文章。
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "作り手の似顔絵" },
        body: [
          { text: "日本では管理栄養士として、さまざまな食の現場に携わってきました。", bold: true },
          { text: "クッキングスクールで日本の家庭料理を教えたり、フランス菓子教室でアシスタントを務めたりと、料理やお菓子づくりの世界にも触れてきました。", bold: false },
          { text: "そんな経験を通して、素材や手仕事が生み出す味わいに惹かれ、\n今はスペイン・カタルーニャの豊かな自然の中で、日本の伝統的な発酵文化を大切にしながら味噌を仕込んでいます。", bold: false }
        ],
        // 本文の最後に表示するブランド署名(ロゴ+タグライン+メール)
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["米麹(米、麹菌)", "大豆", "海塩"],
      ingredientsNote: "米・大豆・塩はすべて有機認証原料を使用しています。",
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
      name: "Miso vermell cru madurat",
      tagline: "Des de l'elaboració del koji d'arròs fins a l'elaboració final, cada pas es cuida amb temps i dedicació: és el miso tradicional d'abans.",
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
            heading: "① Elaboració d'hivern (kan-jikomi)",
            body: [
              { text: "Elaborat durant l'època més freda de l'any, seguint el mètode tradicional anomenat “kan-jikomi”.", bold: true }
            ]
          },
          {
            heading: "② Un mètode d'elaboració tradicional",
            body: [
              { text: "S'elabora dins del període limitat entre el solstici d'hivern i l'inici de la primavera.", bold: true },
              { text: "És un mètode d'elaboració tradicional que s'ha transmès des de fa segles, no només per al miso, sinó també per a altres aliments fermentats com el sake o la salsa de soja.", bold: false }
            ]
          },
          {
            heading: "③ Més d'un any de fermentació i maduració",
            body: [
              { text: "Aprofitem l'acció natural del fong koji, deixant que el miso fermenti i maduri sense pasteurització (tractament tèrmic) ni l'ús d'alcohol per aturar la fermentació.", bold: true }
            ]
          },
          {
            heading: "④ Koji d'arròs artesanal, elaborat amb fong koji japonès",
            body: [
              { text: "Utilitzem fong koji tradicional procedent d'una casa productora amb llarga trajectòria al Japó, i elaborem el nostre propi koji d'arròs amb cura, enmig de la natura de l'Alta Garrotxa.", bold: true }
            ]
          },
          {
            heading: "⑤ Producció en petites quantitats",
            body: [
              { text: "Com que seguim el mètode tradicional i només elaborem el miso durant un període limitat cada any, la quantitat disponible és limitada.", bold: true }
            ]
          }
        ],
        closing: {
          main: "Color i riquesa per a la taula de cada dia."
        }
      },
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "Retrat il·lustrat de la creadora" },
        body: [
          { text: "Al Japó va treballar com a dietista-nutricionista titulada en diversos àmbits relacionats amb l'alimentació.", bold: true },
          { text: "També ha estat vinculada al món de la cuina i la rebosteria, ensenyant cuina casolana japonesa en una escola de cuina i col·laborant com a assistent en un curs de rebosteria francesa.", bold: false },
          { text: "A través d'aquestes experiències, es va sentir atreta pel sabor que neix dels bons ingredients i del treball fet a mà.\nAvui dia, envoltada de la rica natura de Catalunya, elabora miso tot valorant la cultura tradicional japonesa de la fermentació.", bold: false }
        ],
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["Koji d'arròs (arròs, fong koji)", "Soja", "Sal marina"],
      ingredientsNote: "L'arròs, la soja i la sal són tots ingredients certificats ecològics.",
      allergens: ["Soja"],
      storageWarning: [
        { text: "Com que és miso cru, el llevat encara és viu.", bold: true },
        { text: "La fermentació pot avançar fàcilment, per això cal conservar-lo a la nevera.", bold: true }
      ],
      storageMethod: "Com que valorem la fermentació natural del miso, aquest pot continuar fermentant durant l'emmagatzematge segons la temperatura.\n\nAbans d'obrir-lo, cal conservar-lo en un lloc fresc, allunyat de la llum solar directa. Per gaudir-ne en les millors condicions, recomanem conservar-lo a la nevera fins i tot abans d'obrir-lo.\n\nUn cop obert, cal conservar-lo sempre a la nevera.",
      bestBefore: [
        { text: "La data de consum preferent és d'aproximadament un any des de l'envasat.", bold: true },
        { text: "Com que el miso continua fermentant i madurant, el seu color, aroma i sabor canviaran gradualment segons les condicions d'emmagatzematge i el pas del temps.\nAquest canvi també forma part del caràcter propi del miso cru.", bold: false }
      ]
    },
    es: {
      name: "Miso rojo crudo madurado",
      tagline: "Desde la elaboración del koji de arroz hasta el proceso final, cada paso se cuida con tiempo y dedicación: es el miso tradicional de siempre.",
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
            heading: "① Elaboración de invierno (kan-jikomi)",
            body: [
              { text: "Elaborado durante la época más fría del año, siguiendo el método tradicional llamado “kan-jikomi”.", bold: true }
            ]
          },
          {
            heading: "② Un método de elaboración tradicional",
            body: [
              { text: "Se elabora dentro del periodo limitado entre el solsticio de invierno y el inicio de la primavera.", bold: true },
              { text: "Es un método de elaboración tradicional que se ha transmitido desde hace siglos, no solo para el miso, sino también para otros alimentos fermentados como el sake o la salsa de soja.", bold: false }
            ]
          },
          {
            heading: "③ Más de un año de fermentación y maduración",
            body: [
              { text: "Aprovechamos la acción natural del hongo koji, dejando que el miso fermente y madure sin pasteurización (tratamiento térmico) ni el uso de alcohol para detener la fermentación.", bold: true }
            ]
          },
          {
            heading: "④ Koji de arroz artesanal, elaborado con hongo koji japonés",
            body: [
              { text: "Utilizamos hongo koji tradicional procedente de una casa productora con larga trayectoria en Japón, y elaboramos nuestro propio koji de arroz con cuidado, en medio de la naturaleza de la Alta Garrotxa.", bold: true }
            ]
          },
          {
            heading: "⑤ Producción en pequeñas cantidades",
            body: [
              { text: "Como seguimos el método tradicional y solo elaboramos el miso durante un periodo limitado cada año, la cantidad disponible es limitada.", bold: true }
            ]
          }
        ],
        closing: {
          main: "Color y riqueza para la mesa de cada día."
        }
      },
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "Retrato ilustrado de la creadora" },
        body: [
          { text: "En Japón trabajó como dietista-nutricionista titulada en diversos ámbitos relacionados con la alimentación.", bold: true },
          { text: "También ha estado vinculada al mundo de la cocina y la repostería, enseñando cocina casera japonesa en una escuela de cocina y colaborando como asistente en un curso de repostería francesa.", bold: false },
          { text: "A través de estas experiencias, se sintió atraída por los sabores que nacen de los buenos ingredientes y el trabajo hecho a mano.\nHoy en día, rodeada de la rica naturaleza de Cataluña, elabora miso valorando la cultura tradicional japonesa de la fermentación.", bold: false }
        ],
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["Koji de arroz (arroz, hongo koji)", "Soja", "Sal marina"],
      ingredientsNote: "El arroz, la soja y la sal son todos ingredientes certificados ecológicos.",
      allergens: ["Soja"],
      storageWarning: [
        { text: "Como es miso crudo, la levadura sigue viva.", bold: true },
        { text: "La fermentación puede avanzar fácilmente, por eso hay que conservarlo en la nevera.", bold: true }
      ],
      storageMethod: "Como valoramos la fermentación natural del miso, este puede seguir fermentando durante el almacenamiento según la temperatura.\n\nAntes de abrirlo, conviene conservarlo en un lugar fresco, alejado de la luz solar directa. Para disfrutarlo en las mejores condiciones, recomendamos conservarlo en el refrigerador incluso antes de abrirlo.\n\nUna vez abierto, debe conservarse siempre en el refrigerador.",
      bestBefore: [
        { text: "La fecha de consumo preferente es de aproximadamente un año desde el envasado.", bold: true },
        { text: "Como el miso continúa fermentando y madurando, su color, aroma y sabor cambiarán gradualmente según las condiciones de almacenamiento y el paso del tiempo.\nEse cambio también forma parte del carácter propio del miso crudo.", bold: false }
      ]
    },
    en: {
      name: "Aged Raw Miso (Red Miso)",
      tagline: "From making the rice koji to the final preparation, every step is carefully nurtured over time — this is traditional, old-fashioned miso.",
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
            heading: "① Cold-Season Brewing (Kan-jikomi)",
            body: [
              { text: "Brewed during the coldest time of the year — the traditional method known as “kan-jikomi.”", bold: true }
            ]
          },
          {
            heading: "② A Traditional Brewing Method",
            body: [
              { text: "Brewed within the limited window between the winter solstice and the first day of spring.", bold: true },
              { text: "This traditional brewing method has long been passed down not only for miso, but also for other fermented foods such as sake and soy sauce.", bold: false }
            ]
          },
          {
            heading: "③ Over a Year of Fermentation and Aging",
            body: [
              { text: "We let the koji mold do its work naturally, fermenting and aging the miso without heat treatment (pasteurization) or alcohol to stop fermentation.", bold: true }
            ]
          },
          {
            heading: "④ Handmade Rice Koji, Grown with Japanese Koji Mold",
            body: [
              { text: "We use traditional koji mold sourced from a long-established koji maker in Japan, carefully growing our own rice koji amid the rich nature of Alta Garrotxa.", bold: true }
            ]
          },
          {
            heading: "⑤ Small-Batch Production",
            body: [
              { text: "Because we follow traditional methods and brew only during a limited season each year, the quantity we can offer is limited.", bold: true }
            ]
          }
        ],
        closing: {
          main: "Bringing color and richness to your everyday table."
        }
      },
      creator: {
        image: { src: "images/aka-miso/creator.jpg", alt: "Portrait illustration of the maker" },
        body: [
          { text: "In Japan, she worked as a registered dietitian across a variety of food-related settings.", bold: true },
          { text: "She has also been involved in the world of cooking and baking — teaching Japanese home cooking at a cooking school and assisting at a French pastry class.", bold: false },
          { text: "Through these experiences, she became drawn to the flavors created by good ingredients and handwork.\nToday, surrounded by the rich nature of Catalonia, Spain, she brews miso while cherishing Japan's traditional fermentation culture.", bold: false }
        ],
        brand: {
          logo: { src: "images/aka-miso/hakkodo-logo-crop.png", alt: "HAKKODO" },
          tagline: "Japanese Food / Fermentation / Miso",
          email: "hakkodo.arigato@gmail.com"
        }
      },
      ingredients: ["Rice koji (rice, koji mold)", "Soybeans", "Sea salt"],
      ingredientsNote: "The rice, soybeans, and salt are all certified organic.",
      allergens: ["Soybeans"],
      storageWarning: [
        { text: "This is raw miso, so the yeast is still alive.", bold: true },
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
