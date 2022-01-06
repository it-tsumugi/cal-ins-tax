import { useState, VFC } from "react";
import styled from "styled-components";
import { kokuhoData } from "../../constant/kokuhoData";

const initialYear = 3;
let optionYear: number[] = [];

for (let i = initialYear, j = 0; i < initialYear + 10; i++, j++) {
  optionYear[j] = i;
}

type propsType = {
  age: number;
  peopleNum: number;
  income: number;
  setResult: React.Dispatch<React.SetStateAction<taxTableType>>;
};

type taxTableType = {
  syotoku_medical: number;
  syotoku_elderly: number;
  syotoku_care: number;
  syotoku_sum: number;
  kinto_medical: number;
  kinto_elderly: number;
  kinto_care: number;
  kinto_sum: number;
  byodo_medical: number;
  byodo_elderly: number;
  byodo_care: number;
  byodo_sum: number;
  medical_sum: number;
  elderly_sum: number;
  care_sum: number;
  sum_sum: number;
  medical_limit: number;
  elderly_limit: number;
  care_limit: number;
  limit_sum: number;
};

const initialResult: taxTableType = {
  syotoku_medical: 0,
  syotoku_elderly: 0,
  syotoku_care: 0,
  syotoku_sum: 0,
  kinto_medical: 0,
  kinto_elderly: 0,
  kinto_care: 0,
  kinto_sum: 0,
  byodo_medical: 0,
  byodo_elderly: 0,
  byodo_care: 0,
  byodo_sum: 0,
  medical_sum: 0,
  elderly_sum: 0,
  care_sum: 0,
  sum_sum: 0,
  medical_limit: kokuhoData.MEDICAL_LIMIT,
  elderly_limit: kokuhoData.ELDERLY_LIMIT,
  care_limit: kokuhoData.CARE_LIMIT,
  limit_sum:
    kokuhoData.MEDICAL_LIMIT + kokuhoData.ELDERLY_LIMIT + kokuhoData.CARE_LIMIT,
};

const calculate = (props: propsType) => {
  const { age, peopleNum, income, setResult } = props;
  const isShouldPayCare = age === 1;

  let temp = income - kokuhoData.SYOTOKU_KISO_KOJO;
  if (temp < 0) temp = 0;
  const syotoku_kisogaku = temp;

  const syotoku_medical = syotoku_kisogaku * kokuhoData.MEDICAL_INSURANCE_RATE;
  const syotoku_elderly = syotoku_kisogaku * kokuhoData.ELDERLY_INSURANCE_RATE;
  const syotoku_care =
    syotoku_kisogaku * (isShouldPayCare ? kokuhoData.CARE_INSURANCE_RATE : 0);
  const syotoku_sum = syotoku_medical + syotoku_elderly + syotoku_care;

  const kinto_medical = kokuhoData.MEDICAL_KINTO_FEE * peopleNum;
  const kinto_elderly = kokuhoData.ELDERLY_KINTO_FEE * peopleNum;
  const kinto_care =
    (isShouldPayCare ? kokuhoData.CARE_KINTO_FEE : 0) * peopleNum;
  const kinto_sum = kinto_medical + kinto_elderly + kinto_care;

  const byodo_medical = kokuhoData.MEDICAL_BYODO_FEE;
  const byodo_elderly = kokuhoData.ELDERLY_BYODO_FEE;
  const byodo_care = isShouldPayCare ? kokuhoData.CARE_BYODO_FEE : 0;
  const byodo_sum = byodo_medical + byodo_elderly + byodo_care;

  const medical_sum = syotoku_medical + kinto_medical + byodo_medical;
  const elderly_sum = syotoku_elderly + kinto_elderly + byodo_elderly;
  const care_sum = syotoku_care + kinto_care + byodo_care;
  const sum_sum = medical_sum + elderly_sum + care_sum;

  const result: taxTableType = {
    syotoku_medical: syotoku_medical,
    syotoku_elderly: syotoku_elderly,
    syotoku_care: syotoku_care,
    syotoku_sum: syotoku_sum,
    kinto_medical: kinto_medical,
    kinto_elderly: kinto_elderly,
    kinto_care: kinto_care,
    kinto_sum: kinto_sum,
    byodo_medical: byodo_medical,
    byodo_elderly: byodo_elderly,
    byodo_care: byodo_care,
    byodo_sum: byodo_sum,
    medical_sum: medical_sum,
    elderly_sum: elderly_sum,
    care_sum: care_sum,
    sum_sum: sum_sum,
    medical_limit: kokuhoData.MEDICAL_LIMIT,
    elderly_limit: kokuhoData.ELDERLY_LIMIT,
    care_limit: kokuhoData.CARE_LIMIT,
    limit_sum:
      kokuhoData.MEDICAL_LIMIT +
      kokuhoData.ELDERLY_LIMIT +
      kokuhoData.CARE_LIMIT,
  };

  setResult(result);

  if (sum_sum !== syotoku_sum + kinto_sum + byodo_sum)
    window.alert("エラー:合計が一致しません");
};

export const Top: VFC = () => {
  const [year, setYear] = useState<number>(initialYear);
  const [age, setAge] = useState<number>(0);
  const [peopleNum, setPeopleNum] = useState<number>(1);
  const [income, setIncome] = useState<number>(0);
  const [result, setResult] = useState<taxTableType>(initialResult);

  return (
    <SComponentContainer>
      <SContents>
        <h2>このサイトは福井市の国民健康保険税計算サイトです</h2>
        <SFlexContainer>
          <div style={{ marginRight: "10px" }}>参考</div>
          <a href="https://www.city.fukui.lg.jp/fukusi/hoken/tax/kokuhofuka2012.html">
            福井市 国民健康保険税
          </a>
        </SFlexContainer>
      </SContents>

      <SContents>
        <div>令和何年度の国民健康保険税の計算がしたいか入力してください</div>
        <select onChange={(e) => setYear(Number(e.target.value))}>
          {optionYear.map((item) => {
            return (
              <option value={item} key={item}>
                {"令和" + item + "年度"}
              </option>
            );
          })}
        </select>
      </SContents>

      <SContents>
        <div>年齢区分を選択してください</div>
        <select onChange={(e) => setAge(Number(e.target.value))}>
          <option value="0">0~39歳</option>
          <option value="1">40~64歳</option>
          <option value="2">65歳~</option>
        </select>
      </SContents>

      <SContents>
        <div>世帯内国保加入者の人数を入力してください</div>
        <select onChange={(e) => setPeopleNum(Number(e.target.value))}>
          <option value="1">1人</option>
          <option value="2">2人</option>
          <option value="3">3人</option>
          <option value="4">4人</option>
          <option value="5">5人</option>
        </select>
      </SContents>

      <SContents>
        <div>
          {"世帯内国保加入者全員の令和" +
            (year - 1) +
            "年1月から12月までの所得の合計を半角で入力してください"}
        </div>
        <SFlexContainer>
          <input
            value={income}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (isNaN(value))
                window.alert("半角の数値以外を入力することはできません");
              else setIncome(Number(e.target.value));
            }}
          />
          <span>円</span>
        </SFlexContainer>
        <div>※正確には総所得金額等であり、代表的なものに給与所得があります</div>
        <div>
          ※国民健康保険税は年度ごとに支払いますが、その額は前年の1月から12月までの所得で判断します
        </div>
        <div>
          例）令和３年度の国民健康保険税は令和２年1月から令和2年12月までの所得で判断されます
        </div>
      </SContents>
      <button
        onClick={() =>
          calculate({
            age,
            peopleNum,
            income,
            setResult,
          })
        }
      >
        計算する
      </button>
      <SContents>
        <SCenter>
          <h1>令和{year}年度国民健康保険税</h1>
          <h1>{result.sum_sum}円</h1>
        </SCenter>
        <STableBlock>
          <STableCell></STableCell>
          <STableCell>医療保険分</STableCell>
          <STableCell>後期高齢者支援金等分</STableCell>
          <STableCell>*介護保険分</STableCell>
          <STableCell>合計</STableCell>
        </STableBlock>
        <STableBlock>
          <STableCell>所得割額</STableCell>
          <STableCell>{result.syotoku_medical}円</STableCell>
          <STableCell>{result.syotoku_elderly}円</STableCell>
          <STableCell>{result.syotoku_care}円</STableCell>
          <STableCell>{result.syotoku_sum}円</STableCell>
        </STableBlock>
        <STableBlock>
          <STableCell>均等割額</STableCell>
          <STableCell>{result.kinto_medical}円</STableCell>
          <STableCell>{result.kinto_elderly}円</STableCell>
          <STableCell>{result.kinto_care}円</STableCell>
          <STableCell>{result.kinto_sum}円</STableCell>
        </STableBlock>
        <STableBlock>
          <STableCell>平等割額</STableCell>
          <STableCell>{result.byodo_medical}円</STableCell>
          <STableCell>{result.byodo_elderly}円</STableCell>
          <STableCell>{result.byodo_care}円</STableCell>
          <STableCell>{result.byodo_sum}円</STableCell>
        </STableBlock>
        <STableBlock>
          <STableCell>合計</STableCell>
          <STableCell>{result.syotoku_sum}円</STableCell>
          <STableCell>{result.elderly_sum}円</STableCell>
          <STableCell>{result.care_sum}円</STableCell>
          <STableCell>{result.sum_sum}円</STableCell>
        </STableBlock>
        <STableBlock>
          <STableCell>(年間最高限度額)</STableCell>
          <STableCell>({kokuhoData.MEDICAL_LIMIT}円)</STableCell>
          <STableCell>({kokuhoData.ELDERLY_LIMIT}円)</STableCell>
          <STableCell>({kokuhoData.CARE_LIMIT}円)</STableCell>
          <STableCell></STableCell>
        </STableBlock>
        <div>※介護保険分は40~64歳の人のみ</div>
      </SContents>
    </SComponentContainer>
  );
};

const SComponentContainer = styled.div`
  padding: 20px;
`;

const SContents = styled.div`
  margin-bottom: 20px;
`;

const SFlexContainer = styled.div`
  display: flex;
`;

const STableBlock = styled.div`
  display: table;
  text-align: center;
`;

const STableCell = styled.div`
  display: table-cell;
  width: 160px;
  padding: 5px;
  border: 1px solid #666;
`;

const SCenter = styled.div`
  text-align: center;
`;
