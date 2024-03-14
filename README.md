# Dự án công nghệ thông tin 2 (fiveace)

## Mô tả

Hệ thống tư vấn tuyển sinh sinh viên là một đề tài nghiên cứu nhằm tạo ra một hệ thống hỗ trợ tư vấn, giải đáp các thắc mắc cho các thí sinh khi xét tuyển vào các trường đại học ở Việt Nam. Đề tài này đã xây dựng một website hoàn chỉnh dựa trên MERN Stack, cung cấp thông tin tuyển sinh, các khóa học cho các thí sinh có mong muốn học trước ngành Công nghệ thông tin và hỗ trợ tư vấn cho các thí sinh trong quá trình xét tuyển. Hệ thống này giúp tối ưu hóa việc tư vấn, nâng cao chất lượng đào tạo, và hạn chế tình trạng bỏ học giúp các thí sinh có thể đưa ra quyết định chính xác nhất cho tương lai của mình.

Ngoài ra, xu hướng sử dụng chatbot đang được ưa chuộng trên thế giới. Việc áp dụng chatbot vào tư vấn tuyển sinh giúp tối ưu hiệu quả vận hành, tóm tắt và cung cấp thông tin nhanh chóng, đầy đủ nhất cho thí sinh. Đề tài cũng nhấn mạnh việc tận dụng trí tuệ nhân tạo để cung cấp thông tin chi tiết và hữu ích về quy trình tuyển sinh. Sử dụng các mô hình như BiLSTM, PhoBERT, GPT-2 và MRCQuestionAnswering , đề tài hướng tới việc cải thiện khả năng trả lời câu hỏi và đưa ra thông tin đa dạng. Hệ thống web cũng sđược xây dựng tích hợp giao diện thân thiện để tương tác với người dùng, cung cấp thông tin về tra cứu tuyển sinh và hỗ trợ đưa ra quyết định thông tin và chi tiết cho sinh viên. Đánh giá hiệu suất của mỗi mô hình và đề xuất cải tiến cho tương lai là các phần quan trọng trong quá trình nghiên cứu và phát triển của đề tài này.

## Các điều kiện tiên quyết

- Text editor: [VS Code](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwii6J-yn7yDAxWe0KACHZeJCJoQFnoECBAQAQ&url=https%3A%2F%2Fcode.visualstudio.com%2Fdownload&usg=AOvVaw11fc5fOXYIyxQh75jYLjXg&opi=89978449)
- [Git](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjCydKUn7yDAxVW-TgGHXH5ClAQFnoECAoQAQ&url=https%3A%2F%2Fgit-scm.com%2F&usg=AOvVaw1lFNWgbWf8FsbaoU4AOPBr&opi=89978449)
- [npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) (version 10.2.3) hoặc [pnpm](https://pnpm.io/installation) (version 8.14.0)
- [nodejs](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiV0Oufn7yDAxVG7TgGHTX3CeYQFnoECBYQAQ&url=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload&usg=AOvVaw1KKGKc_Mgv9UPW5EWXuSiV&opi=89978449) (version 18.19.0)
- [python](https://www.python.org/downloads/) (version 3.11.3)

## Các công nghệ sử dụng

![ReactJS Logo](https://img.shields.io/badge/React-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=white)
![Bootstrap Logo](https://img.shields.io/badge/Bootstrap-%237952B3.svg?&style=for-the-badge&logo=bootstrap&logoColor=white)
![CSS Logo](https://img.shields.io/badge/css-1572b6?style=for-the-badge&logo=css3&logoColor=ffffff)
![NodeJS Logo](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=ffffff)
![MongoDB Logo](https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose Logo](https://img.shields.io/badge/Mongoose-%23880000.svg?&style=for-the-badge&logo=mongoose&logoColor=white)
![Python Logo](https://img.shields.io/badge/Python-%233776AB.svg?&style=for-the-badge&logo=python&logoColor=white)

## Các bước để chạy project

### Module chatbot

Bước 1: Di chuyển đến thư mục chatbot `cd .\chatbot\`

Bước 2: Tạo `.venv` (Py Environment) theo các bước trong [Python environments in VS Code](https://code.visualstudio.com/docs/python/environments) và tiến hành cài đặt các thư viện cần thiết trong file `requirements.txt` với lệnh `pip install -r requirement.txt`

`*Lưu ý: Bước này sẽ khá mất thời gian do các thư viện được sử dụng khá nặng.`

Bước 3: Gõ lệnh `py main.py` để launch server chatbot

### Module end user website

Bước 1: Di chuyển đến thư mục website `cd .\website\`.

Bước 2: Chia terminal thành 2 tab. Một tab di chuyển đến thư mục back-end và tab còn lại di chuyển đến thư mục front-end.

Bước 2: Gõ lệnh `pnpm i` ở mỗi thư mục trên để cài các dependency cần thiết để chạy project (Hoặc dùng các công cụ khác như `npm i` hoặc `yarn i`).

Bước 3: Gõ lệnh `pnpm start` hoặc `npm start` hoặc `yarn start` ở mỗi thư mục để launch project để launch project.

`*Lưu ý: port mặc định của ReactJS là 3000, nếu bạn muốn thay đổi project ở PORT khác thì vẫn trong thư mục website, tạo file mới và đặt tên là .env.anythingyouwant (ví dụ: .env.local) sau đó gõ PORT=<port-bạn-muốn>`

Ảnh mẫu terminal:

![Alt image](/resources/image.png)

## License

[MIT](https://github.com/mrcaidev/hooks/tree/master/LICENSE)
