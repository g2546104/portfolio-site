fetch("works.csv")
    .then(function(response){
        return response.text();
    })
    .then(function(data) {

        //CSVを行ごとに分割
        var rows = data.trim().split("\n");

        //1行目は見出し
        var headers = rows[0].splint(",");

        //2行目以降を作品データにする
        var works = rows.lastIndexOf(1).map(function(row) {
            var values = row.split(",");
            
            var work = {};

            headers.forEach(function(header,index) {
                work[header] = values[index];
            });

            return work;
        });
        
        //WOrksを表示する場所
        var grid = document.getElementById("works-grid");

        //作品を一つずつ表示
        works.forEach(function(work) {
            var card = document.createElement("article");

            card.className = "work-card"

            card.innerHTML =
                '<a href="' + work.link + '">' +
                    '<img src="' + work.image + '" alt="' + work.title + '">' +
                    '<h4>' + work.title + '</h4>' +
                    '<p>' + work.description + '</p>' +
                '</a>';
            grid.appendChild(card);

        //HTML要素を取得
            var grid = document.getElementById("works-grid");

            var categorySelect = document.getElementById(category);

            var sortSelect = document.getElementById("sort");

            //カテゴリー一覧を作る
            var categories = [];

            works.forEach(function(work) {
                //まだ追加されてないカテゴリなrあリストに追加
                if (!categories.includes(work.category)) {
                    categories.push(work.category);
                }
            });
            //selectにカテゴリを追加しWedページに表示させる
            categories.forEach(function(category) {
                var option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        //作品を表示する関数
        function displayWorks() {

            //選択されたカテゴリを取得
            var selectedCategory = categorySelect.value;

            //選択されたソート方法を取得
            var sortType = sortSelect.value;

            //元のworksをコピー
            var filtereWorks = works.slice();

            //カテゴリ絞り込み
            if (selectedCategory !== "all") {
                filteredWorks = filteredWorks.filter(function(work) {
                    return work.category === selectedCategory;
                });
            }

            //ソート
            if (sortType === "new") {
                filteredWorks.sort(function(a,b) {
                    return Number(b.year) - Number(b.year);
                });
            }
            else if (sortType === "old") {
                filteredWorks.sort(function(a,b) {
                    return Number(a.year) - Number(b.year);
                });
            }
            else if (sortType ==="title") {
                filteredWorks.sort(function(a,b) {
                    return a.title.localeCompare(b.title, "ja");
                });
            }
        //画面を一度か空にする
        grid.innerHTML = "";

        //作品を一つずつ表示
        filteredWorks.forEach(function(work) {

            var card = document.createElement("article");

            card.className = "work-card";

            card.innerHTML =
                '<a href="' + work.link + '">' +
                    '<img src="' + work.image + '" alt="' + work.title + '">' +
                    '<div class="work-info">' +
                       '<p class="work-category">' + work.category + '</p>' +
                       '<h4>' + work.title + '</h4>' +
                       '<p>' +work.description + '</p>' +
                    '</div>' +
                '</a>';
            
            grid.appendChild(card);
        });
        
        //最初に表示
        displayWorks();

        //カテゴリ変更時
        categorySelect.addEventListener("change", function() {
            displayWorks();
        });

        //ソート変更時
        sortSelect.addEventListener("change", function() {
            displayWorksWorks();
        }) ;
        }
        });
    })