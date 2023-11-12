import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../styles/style.css';
import AwesomeTable from './AwesomeTable';

export default function CustomerInfo() {
  const [customer, setCustomer] = useState({
    name: '',
    currentRank: '',
    totalSpent: 0,
    lastCalculationDate: '',
    firstDayOfLastYear: '',
    requiredForNextRank: 0,
    downgradeRank: '',
    downgradeDate: '',
    downgradeThresholdDiff: 0,
  })
  const { customerId } = useParams()

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`/customers/${ customerId }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json()
      console.log(responseData)
      setCustomer(responseData)
    }
    fetchCustomers()
  }, [setCustomer, customerId])

  const data = [
    {
      'Name': customer.name,
      'Current Rank': customer.currentRank,
      'Calculation Start Date': customer.firstDayOfLastYear,
      'Total Spent': customer.totalSpent,
      'Required For Next Rank': customer.requiredForNextRank,
      'Downgrade Rank': customer.downgradeRank,
      'Downgrade Date': customer.downgradeDate,
      'Downgrade Threshold Diff': customer.downgradeThresholdDiff,
    },
  ]

  const columns = [
    // 仕様にはないけどあった方がいいかなと思ったので追加
    {
      Header: 'Name',
      accessor: 'Name',
    },
    // 1. 現在のランク
    {
      Header: 'Current Rank',
      accessor: 'Current Rank',
    },
    // 2. ランク計算の開始日
    {
      Header: 'Calculation Start Date',
      accessor: 'Calculation Start Date',
    },
    // 3. ランク計算開始日以降に使用された金額の合計
    {
      Header: 'Total Spent',
      accessor: 'Total Spent',
    },
    // 4. 次のランクに到達するために使用しなければならない金額
    {
      Header: 'Required For Next Rank',
      accessor: 'Required For Next Rank',
    },
    // 5. これ以上使用しなかった場合、その顧客が来年ダウングレードされるランク
    {
      Header: 'Downgrade Rank',
      accessor: 'Downgrade Rank',
    },
    // 6. ダウングレードの日付
    {
      Header: 'Downgrade Date',
      accessor: 'Downgrade Date',
    },
    // 7. ダウングレードを回避するために顧客が今年使う必要のある金額
    {
      Header: 'Downgrade Threshold Diff',
      accessor: 'Downgrade Threshold Diff',
    },
  ]

  return (
    <>
      <h1>customer info</h1>
      <AwesomeTable columns={columns} data={data} />
      <Link to="/">Back to home</Link>
    </>
  )
}
