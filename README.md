## 프로젝트 소개

2024년 4월 10일(수) 예정된 22대 국회의원 선거를 앞두고, KBS 선거방송기획단에서 선보이는 프로그램

이 프로그램은 아이돌과 배우들을 대상으로 하는 투표 유도 게임으로, 참여자들이 투표에 참여하는 데에 즐거움과 흥미를 더하고, 시청자들의 선거 참여 의욕을 높이는 것을 목표로  둠

## 프로젝트 목적

- 공정한 게임 진행
    -  랜덤한 시간과 번호를 활용하여 PD(사람)의 개입 없이 투표 음원을 생성함으로써, 게임의 공정성을 보장
- 정확한 발음과 명확한 전달
    - AI 음원을 활용하여 참여자들에게 명확하게 투표 안내를 전달하며, 발음의 정확성을 유지
- 반복 최소화
    - PD들이 동일한 작업을 반복할 필요 없이 프로그램화되어 자동으로 음원을 재생
    - 이를 통해 효율성을 극대화하고 참여자들에게 일관된 경험을 제공함

---

## 프로그램 로직

1. 음원 갯수만큼의 파일을 shuffle 하여 메인 화면에서 설정한 갯수 만큼 slice 함

2. level별로 해당되는 음원이 재생됨

    - lv1, lv2는 비례/지역 중 고르는 지령
        - index 번호에 따라 추출하도록 함
    - lv3 - lv5는 전체 지령중에 랜덤으로 선택하도록 함
        - srcList.js에 파일번호별로 음원을 분류해둠
        - 해당 분류는 bash script를 사용(하단 참고)

---

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

## 음원 filter

특정한 이유로 해당 파일들을 구분하거나 강조하지 않고자 일부 번호를 filtering할 필요가 있어 filterAudio.sh 작성

```
#!/bin/bash

shopt -s nullglob

for ((i=31; i<=50; i++)); do
    file_number=$(printf "%02d" $i)
    files=(*_${file_number}.mp3)

    for file in "${files[@]}"; do
        # 한 자릿수 음원 제외
        if [[ "${#file}" -eq 11 ]]; then
            continue
        fi
        # 앞 두자리가 21-30 또는 31-50 인 경우에 출력
        if [[ "${file:0:2}" -ge 11 && "${file:0:2}" -le 20 || "${file:0:2}" -ge 31 && "${file:0:2}" -le 50 ]]; then
            echo "$file"
        fi
    done
done

shopt -u nullglob

```

#### 결과

```
12_ll_11.mp3
13_ll_11.mp3
14_ll_11.mp3
15_ll_11.mp3
... (생략) ...
43_pp_50.mp3
44_pp_50.mp3
45_pp_50.mp3
46_pp_50.mp3
47_pp_50.mp3
48_pp_50.mp3
49_pp_50.mp3

```

---

#### 참고 영상

## 프로젝트 소개

2024년 4월 10일(수) 예정된 22대 국회의원 선거를 앞두고, KBS 선거방송기획단에서 선보이는 프로그램

이 프로그램은 아이돌과 배우들을 대상으로 하는 투표 유도 게임으로, 참여자들이 투표에 참여하는 데에 즐거움과 흥미를 더하고, 시청자들의 선거 참여 의욕을 높이는 것을 목표로  둠

## 프로젝트 목적

- 공정한 게임 진행
    -  랜덤한 시간과 번호를 활용하여 PD(사람)의 개입 없이 투표 음원을 생성함으로써, 게임의 공정성을 보장
- 정확한 발음과 명확한 전달
    - AI 음원을 활용하여 참여자들에게 명확하게 투표 안내를 전달하며, 발음의 정확성을 유지
- 반복 최소화
    - PD들이 동일한 작업을 반복할 필요 없이 프로그램화되어 자동으로 음원을 재생
    - 이를 통해 효율성을 극대화하고 참여자들에게 일관된 경험을 제공함

---

## 프로그램 로직

1. 음원 갯수만큼의 파일을 shuffle 하여 메인 화면에서 설정한 갯수 만큼 slice 함

2. level별로 해당되는 음원이 재생됨

    - lv1, lv2는 비례/지역 중 고르는 지령
        - index 번호에 따라 추출하도록 함
    - lv3 - lv5는 전체 지령중에 랜덤으로 선택하도록 함
        - srcList.js에 파일번호별로 음원을 분류해둠
        - 해당 분류는 bash script를 사용(하단 참고)

---

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

## 음원 filter

특정한 이유로 해당 파일들을 구분하거나 강조하지 않고자 일부 번호를 filtering할 필요가 있어 filterAudio.sh 작성

```
#!/bin/bash

shopt -s nullglob

for ((i=31; i<=50; i++)); do
    file_number=$(printf "%02d" $i)
    files=(*_${file_number}.mp3)

    for file in "${files[@]}"; do
        # 한 자릿수 음원 제외
        if [[ "${#file}" -eq 11 ]]; then
            continue
        fi
        # 앞 두자리가 21-30 또는 31-50 인 경우에 출력
        if [[ "${file:0:2}" -ge 11 && "${file:0:2}" -le 20 || "${file:0:2}" -ge 31 && "${file:0:2}" -le 50 ]]; then
            echo "$file"
        fi
    done
done

shopt -u nullglob

```

#### 결과

```
12_ll_11.mp3
13_ll_11.mp3
14_ll_11.mp3
15_ll_11.mp3
... (생략) ...
43_pp_50.mp3
44_pp_50.mp3
45_pp_50.mp3
46_pp_50.mp3
47_pp_50.mp3
48_pp_50.mp3
49_pp_50.mp3

```

---

#### 참고 영상

[![screenshot](https://github.com/hansojin/kbs_stamp/assets/112622663/a659014a-080d-4792-a88e-710b881688e9)](https://youtu.be/Ki3GtxlIfkI)
