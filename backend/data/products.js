import path from "path";

const products = [
  {
    name: "Wilson Natural Gut 17/1.25",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=WNXTS16-1.jpg&nw=540",
    description:
      "Great value in a multifilament! A comfortable playing string with a nice blend of feel & playability. Known for its vibration dampening qualities, Sensation original lives up to its long-standing reputation as an arm-friendly string choice. It's a great option for players looking for a soft, playable alternative to natural gut, or for those seeking a more comfortable selection compared to the stiffer synthetic guts. This thinner 17g version is even softer and offers more spin potential while sacrificing a bit of durability compared to the 16g version.",
    length: "40ft/12.2m ",
    gauge: "17/1.25",
    composition:
      "Dupont Zycro Micro fiber core surrounded by a multifilament outer wrap",
    color: "Natural",
    brand: "Wilson",
    category: "Strings",
    price: 11.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Wilson NXT Soft 16/1.30 String Silver",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=WNXTS16-1.jpg&nw=540",
    description:
      "Introducing NXT Soft! With this string Wilson builds upon their legendary NXT formula to give you an even more comfortable ride. In addition to being ideal for the player who wants a uniquely arm-friendly hitting experience,  NXT Soft is great for those who want to minimize the harsh vibrations that are common with today's light and stiff racquets. Ultimately, NXT Soft is simply a great option for the player who wants a luxurious hitting experience with juicy levels of comfort and power. It will also add instant feel and comfort to any hybrid.",
    length: "12.2M/40ft ",
    gauge: "16/1.30",
    composition: "Multifilament",
    color: "Silver",
    brand: "Wilson",
    category: "Strings",
    price: 21.99,
    countInStock: 14,
    rating: 4.5,
    numReviews: 15,
  },
  {
    name: "Wilson Duo Control 4GR 1.25 & NXT Control 16 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=DUOC4GNXT-1.jpg&nw=540",
    description:
      "Duo Control is the perfect hybrid for big hitters who want exceptional control without having to sacrifice feel or comfort. This set-up includes Luxilon 4G Rough 1.25, a textured co-poly with best of class levels of control and spin.  The other string is NXT Control 16, a soft and responsive multifilament that adds moderate power and impressive comfort. All in all, this is a great option for the player who wants a high level of control without the higher levels of impact shock that come with a full bed of polyester.To emphasize control, spin and durability, put 4G Rough in the mains. To emphasize comfort, feel and power, put NXT Control in the mains.",

    length: "40ft/12.2m (total) ",
    gauge: "Luxilon 4G Rough - 1.25mm / Wilson NXT Control - 1.30mm",
    composition:
      "Luxilon 4G Rough - co-polyester / Wilson NXT Control - multifilament",
    color: "4G Rough - Yellow / NXT Control - Natural ",
    brand: "Wilson",
    category: "Strings",
    price: 21.99,
    countInStock: 32,
    rating: 5,
    numReviews: 5,
  },
  {
    name: "Babolat RPM Rough 17/1.25 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=BRPMBRS-BK-1.jpg&nw=540",
    description:
      "RPM Rough is the textured version of RPM Blast, one of the most popular co-polys ever made. Like the standard RPM Blast, this string is a co-polymer monofilament with an octagonal shape and a special cross-linked silicone coating. RPM Rough is perfect for aggressive players who like to attack the ball with long, fast strokes. Our playtesters found it a tad softer and more powerful than the original RPM Blast, resulting in a slightly more penetrating shot. With its grippy surface, you'll find plenty of bite for bringing the ball down with spin. The durability is also quite high, making this a great option for string breakers.",
    length: "40ft/12.2m ",
    gauge: "17/1.25mm",
    composition: "Co-polyester Monofilament",
    color: "Black",
    brand: "Babolat",
    category: "Strings",
    price: 16.99,
    countInStock: 24,
    rating: 4,
    numReviews: 8,
  },
  {
    name: "Babolat Xcel 16/1.30 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=BXCL16-BL-1.jpg&nw=540",
    description:
      "Offering an almost unmatched combination of comfort, touch and feel this newer version of XCel adds a durability upgrade to Babolat's time-tested original recipe. The increase in durability will allow stronger players with longer strokes to enjoy maximum playability. While this one has more than enough pop for players with shorter strokes, the control is actually quite good for the breed. Suitable to all ability levels, this one is a genuine treat for any non-poly player who wants to experience one of the most responsive multifilaments on the market.",
    length: "40ft/12.2m ",
    gauge: "16/1.30mm",
    composition: "Multifilament",
    color: "Natural, Blue",
    brand: "Babolat",
    category: "Strings",
    price: 20.99,
    countInStock: 24,
    rating: 4,
    numReviews: 8,
  },
  {
    name: "Babolat RPM Blast 18/1.20 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=BRPMB18-1.jpg&nw=540",
    description:
      "Big hitters looking for surgical control on their biggest swings have come to the right place. As one of the game's most iconic and popular co-polys, RPM Blast offers a seductive combination of spin and precision. Big hitters looking to load the ball with pace and spin will get dangerous levels of confidence from this string. Try this thin 1.20mm gauge for extra bite and feel.  Did we mention the spin?",
    length: "40ft/12.2m ",
    gauge: "18/1.20mm",
    composition: "Co-polyester Monofilament",
    color: "Black",
    brand: "Babolat",
    category: "Strings",
    price: 18.99,
    countInStock: 56,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Babolat RPM Hurricane 17/1.25 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=RPMHUR7-1.jpg&nw=540",
    description:
      "RPM Hurricane is big on control and spin. It's also quite firm, so we think it works best for intermediate to advanced baseliners with long, fast strokes. String breakers take note: this one offers excellent durability. The octagonal profile gives RPM Hurricane great bite, while the coating allows the strings to snap back with greater force. The result is a heavy ball loaded with spin, especially for players who swing big. Our topspin hitters noted that they could reach maximum swing speed because the spin brought the ball down so effectively. This is a great option for power baseliners who want the ultimate in spin, control, and durability.",
    length: "40ft/12.2m ",
    gauge: "17/1.25mm",
    composition: "Co-polyester Monofilament",
    color: "Yellow",
    brand: "Babolat",
    category: "Strings",
    price: 12.99,
    countInStock: 8,
    rating: 3.5,
    numReviews: 7,
  },
  {
    name: "Luxilon ALU Power 16L/1.25 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=ALUSTR-BL-1.jpg&nw=540",
    description:
      "In addition to being one of the most popular choices on the ATP Tour, this string helped usher in the polyester revolution in tennis. The firm monofilament construction will enable you to take huge cuts at the ball without losing control. As a result, you can generate massive stroke speed, which produces a dangerous combination of pace and spin. Ultimately, this is a great option for intermediate and advanced players who want control, spin and durability. The fact that is offers above average feel for a control string is a very nice bonus.",
    length: "40ft/12.2m ",
    gauge: "16/1.25mm",
    composition: "Co-polymer (nylon) + Fluocarbon resin + aluminum fibers",
    color: "Silver",
    brand: "Luxilon",
    category: "Strings",
    price: 19.99,
    countInStock: 16,
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Luxilon ALU Power Rough 16/1.30 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=LUXAPR16-1.jpg&nw=540",
    description:
      "In addition to being one of the most popular choices on the ATP Tour, this string helped usher in the polyester revolution in tennis. The firm monofilament construction will enable you to take huge cuts at the ball without losing control. As a result, you can generate massive stroke speed, which produces a dangerous combination of pace and spin. Ultimately, this is a great option for intermediate and advanced players who want control, spin and durability. The fact that is offers above average feel for a control string is a very nice bonus.",
    length: "40ft/12.2m ",
    gauge: "16/1.30mm",
    composition: "Co-polyester Monofilament",
    color: "Silver",
    brand: "Luxilon",
    category: "Strings",
    price: 19.99,
    countInStock: 14,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: "Luxilon LXN Smart 16/1.30 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=LUS16S-1.jpg&nw=540",
    description:
      "Introducing Luxilon Smart, a technologically advanced co-poly that combines great feel with impressive all-around playability. As with Luxilon's M2 and Element series, this string is built with a variable flex, enabling it to perform optimally across different stroke speeds. On faster swings, Smart is designed to stiffen so as to provide the attacking player with the needed control to ratchet up the power and spin. On slower or more compact strokes, Smart is designed to play softer for better touch and feel. The upshot is a comfortable co-poly that should work very well for a wide range of playing styles.",
    length: "40ft/12.2m ",
    gauge: "16/1.30mm",
    composition: "Co-polymer with 3 core filaments",
    color: "Black",
    brand: "Luxilon",
    category: "Strings",
    price: 21.99,
    countInStock: 14,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: "Luxilon Element Rough 16/1.30 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=LER130-1.jpg&nw=540",
    description:
      "Luxilon adds a rough texture to their Element co-poly string! The result is some added bite and extra spin-potential. This string also features Multi-Mono Technology , making it one of the most comfortable Luxilon monofilaments. All in all, Element Rough is a great option for players who like attacking the ball with long, fast strokes.  Dare we say that it is the missing element to your game?",
    length: "40ft/12.2m ",
    gauge: "16/1.30mm",
    composition: "Co-polymer Monofilament",
    color: "Bronze",
    brand: "Luxilon",
    category: "Strings",
    price: 17.99,
    countInStock: 8,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Prince Synthetic Gut 16/1.30 Duraflex String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=S16-BK-1.jpg&nw=540",
    description:
      "With its excellent all-around playability, Prince Synthetic Gut w/Duraflex is one of the best value strings of all time. Although it is not quite as soft and lively as a multifilament string, this solid core synthetic offers plenty of comfort along with decent power. It is not only the perfect string for budget minded players in search of solid performance, but it makes a great hybrid cross string. Compared to Prince Synthetic Gut Original, this string is slightly firmer and more durable. ",
    length: "40ft/12.2m ",
    gauge: "16/1.30mm",
    composition: "Solid Core Synthetic Gut w/Duraflex ",
    color: "Black",
    brand: "Prince",
    category: "Strings",
    price: 5.99,
    countInStock: 8,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Prince Premier Touch 16/1.30 String",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=PPT16-1.jpg&nw=540",
    description:
      "Made with twisted ribbons to mimic the construction of natural gut, Prince Premier Touch is one of the softest strings available. With its extremely muted feel, this one offers best of class vibration dampening. As such it is a great option for any player looking for maximum comfort and shock absorption. Power is medium-high for a multifilament string, making it great for any player who wants easy access to depth. Not only is this a great option for beginners and intermediates looking for a truly plush response, it also makes a great hybrid cross, espeically for those who place a premium on comfort.",
    length: "40ft/12.2m ",
    gauge: "16/1.30mm",
    composition: "Multifilament Ribbon Technology",
    color: "Clear",
    brand: "Prince",
    category: "Strings",
    price: 13.99,
    countInStock: 0,
    rating: 3,
    numReviews: 1,
  },

  {
    name: "Babolat Pure Aero Racket",
    image: "https://img.tennis-warehouse.com/cache/120/BPAR-thumb.jpg",
    description:
      "Specializing in spin and power, the Babolat Pure Aero is one of the game's most legendary racquets. At 11.2 ounces strung, this stick is ideal for hard charging intermediate players, but it should also work very well for the advanced ball striker who is looking to go on offense.  For this update, Babolat lowers the flex a tad, giving this notoriously stiff stick a slightly more controlled and arm-friendly response. Babolat has also moved the Cortex dampening material to the head at 3 & 9 o'clock, resulting in a slightly softer feel at impact. But make no mistake: this is still a firm, modern and lively weapon. The signature technology,  called FSI Spin, utilizes wider string spacing for extra bite along with oblong grommets at 6 and 12 o'clock to maximize string movement and snapback. Like the player who endorses this racquet (Rafael Nadal), the Pure Aero feels fast and explosive from the baseline. The speedy response and grippy stringbed provide the recipe for hitting heavy spin-loaded balls that drop hard, and the higher trajectory response makes it easy to keep the ball deep. The mid 320 swingweight draws a nice compromise between speed and stability, and the quick handling makes this a great stick for those who like chasing down balls or ripping winners on the run. At net the Pure Aero plays great on fast exchanges, and there is enough power to finish points with a bang. Ultimately, The Pure Aero remains a very obvious choice for aggressive baseliners looking to control the action with pace and spin.",
    length: "27in / 68.58cm",
    weight: "11.2oz / 318g",
    composition: "Graphite",
    headSize: "100 in / 645.16 cm",
    balance: "12.99in / 32.99cm / 4 pts HL",
    color: "Yellow/Black",
    brand: "Babolat",
    category: "Rackets",
    price: 239.0,
    countInStock: 10,
    rating: 4.5,
    numReviews: 8,
  },
  {
    name: "Babolat Pure Aero Rafa 6 Pack Bag",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=BPARR-1.jpg&nw=540",
    description:
      "Featuring a bold and bright cosmetic to match Rafa's racquet, this bag will help you arrive to the courts completely equipped! The Pure Aero Rafa 6 Pack Bag has been designed for the ultimate player and features two compartments, one which has Isothermal Protection (in an updated white color) and can hold up to 3 racquets each or your tennis gear. There are two exterior pockets with internal organizational features for your smaller items and accessories as well as a vented pocket ideal for carrying shoes or dirty gear. Traveling with this bag will be comfortable when utilizing the attached, padded backpack straps and the quick grab handles make it easy to grab and go. If tennis runs in your blood, this bag is for you!",
    dimension: "L28 x W12 x H12.5",
    color: " Black / Pink / Orange / Yellow",
    suitableFor: 6,
    brand: "Babolat",
    category: "Bags",
    price: 129.95,
    countInStock: 20,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Babolat Tour Original Overgrip",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=BTOOVE3-BK-1.jpg&nw=210",
    description:
      "The Tour Original overgrip provides a dry feel, with a silky texture. This overgrip puts a premium on comfort, and will absorb sweat very well. This overgrip is thicker, and has a slightly more cushioned feel compared to the Babolat VS Original, and Pro Response overgrips.",
    color: "Black, Blue, White",
    thickness: `0.02" / 0.55 mm`,
    brand: "Babolat",
    category: "Grips",
    price: 7.99,
    countInStock: 30,
    rating: 4,
    numReviews: 5,
  },
  {
    name: "Babolat Tour Original Overgrip",
    image:
      "https://img.tennis-warehouse.com/watermark/rs.php?path=BTOOVE3-BK-1.jpg&nw=210",
    description:
      "Penn's longest lasting tennis ball, the Pro Penn Marathon is the #1 choice among USPTA Teaching Professionals. These feature Penn's Encore technology for more longevity in the core and LongPlay felt for better durability. Optik felt keeps visibility at a maximum. These particular Pro Penn Marathon balls are made of extra-duty felt, perfect for hard court play.",

    brand: "Penn",
    category: "Balls",
    price: 5.99,
    countInStock: 46,
    rating: 5,
    numReviews: 5,
  },
];

export default products;
