# KBS_STAMP_GAME

## 파일명 일괄 변경

전달받은 음성 파일의 이름의 통일성을 유지하고자 1,2,3 처럼 한 자리 숫자들앞에 0을 붙여줄 필요가 있었음

#### 해결 방안

음성 파일이 저장된 파일로 이동 후 `addZero.sh` 명의 bash 스크립트 작성

```
#!/bin/bash

for file in *; do
    if [[ -f $file && ${#file} -eq 11 ]]; then
        newname="0$file"
        mv "$file" "$newname"
        echo "변경: $file -> $newname"
    fi
done
```

1-9로 시작하는 파일들에 한해서 앞에 0을 붙여주기 위해 파일명이 11인 파일들을 대상으로 진행

`chmod +x addZero.sh` 로 스크립트에 실행 권한을 부여

`./addZero.sh` 명령어로 스크립트를 진행시킴

#### 결과

```
변경: 1_ll_01.mp3 -> 01_ll_01.mp3
변경: 1_ll_02.mp3 -> 01_ll_02.mp3
변경: 1_ll_03.mp3 -> 01_ll_03.mp3
변경: 1_ll_04.mp3 -> 01_ll_04.mp3
변경: 1_ll_05.mp3 -> 01_ll_05.mp3
... (생략) ...
변경: 9_lp_45.mp3 -> 09_lp_45.mp3
변경: 9_lp_46.mp3 -> 09_lp_46.mp3
변경: 9_lp_47.mp3 -> 09_lp_47.mp3
변경: 9_lp_48.mp3 -> 09_lp_48.mp3
변경: 9_lp_49.mp3 -> 09_lp_49.mp3
변경: 9_lp_50.mp3 -> 09_lp_50.mp3
```

## 파일명 이름 추출

전체 파일에서 음원 번호로 파일을 분류하고자 bash 스크립트를 작성하여 `srcList.js` 파일에 list로 파일명 저장

```
#!/bin/bash

for ((i=1; i<=50; i++)); do
    file_number=$(printf "%02d" $i)  # 1을 01로 포맷팅
    file="*_${file_number}.mp3"
    echo $file
done

```

#### 결과
```
01_ll_01.mp3 02_ll_01.mp3 03_ll_01.mp3 04_ll_01.mp3 05_ll_01.mp3 06_ll_01.mp3 07_ll_01.mp3 08_ll_01.mp3 09_ll_01.mp3 10_ll_01.mp3 11_ll_01.mp3 12_ll_01.mp3 13_ll_01.mp3 14_ll_01.mp3 15_ll_01.mp3 16_ll_01.mp3 17_ll_01.mp3 18_ll_01.mp3 19_ll_01.mp3 20_ll_01.mp3 21_pl_01.mp3 22_pl_01.mp3 23_pl_01.mp3 24_pl_01.mp3 25_pl_01.mp3 26_pl_01.mp3 27_pl_01.mp3 28_pl_01.mp3 29_pl_01.mp3 30_pl_01.mp3 31_pl_01.mp3 32_pl_01.mp3 33_pl_01.mp3 34_pl_01.mp3 35_pl_01.mp3 36_pl_01.mp3 37_pl_01.mp3 38_pl_01.mp3 39_pl_01.mp3 40_pl_01.mp3 41_pl_01.mp3 42_pl_01.mp3 43_pl_01.mp3 44_pl_01.mp3 45_pl_01.mp3 46_pl_01.mp3 47_pl_01.mp3 48_pl_01.mp3 49_pl_01.mp3 50_pl_01.mp3 l_01.mp3
... (생략) ...
01_lp_50.mp3 02_lp_50.mp3 03_lp_50.mp3 04_lp_50.mp3 05_lp_50.mp3 06_lp_50.mp3 07_lp_50.mp3 08_lp_50.mp3 09_lp_50.mp3 10_lp_50.mp3 11_lp_50.mp3 12_lp_50.mp3 13_lp_50.mp3 14_lp_50.mp3 15_lp_50.mp3 16_lp_50.mp3 17_lp_50.mp3 18_lp_50.mp3 19_lp_50.mp3 20_lp_50.mp3 21_pp_50.mp3 22_pp_50.mp3 23_pp_50.mp3 24_pp_50.mp3 25_pp_50.mp3 26_pp_50.mp3 27_pp_50.mp3 28_pp_50.mp3 29_pp_50.mp3 30_pp_50.mp3 31_pp_50.mp3 32_pp_50.mp3 33_pp_50.mp3 34_pp_50.mp3 35_pp_50.mp3 36_pp_50.mp3 37_pp_50.mp3 38_pp_50.mp3 39_pp_50.mp3 40_pp_50.mp3 41_pp_50.mp3 42_pp_50.mp3 43_pp_50.mp3 44_pp_50.mp3 45_pp_50.mp3 46_pp_50.mp3 47_pp_50.mp3 48_pp_50.mp3 49_pp_50.mp3 p_50.mp3

```
