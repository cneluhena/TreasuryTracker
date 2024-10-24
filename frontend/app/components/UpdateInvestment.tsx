'use client'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useForm, Controller} from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";




interface FormData {
  investmentName: string;
  investmentType: string;
  investmentAmount: string| number;
  maturityPeriod: string| number;
  expectedReturn: string | number;
  interestRate: string | number;
  investmentDate: Dayjs | null;
  maturityDate: Dayjs | null;
}

interface UserInvestment {
    investmentName: string;
    investmentType: string;
    investmentAmount: string| number;
    maturityPeriod: string| number;
    expectedReturn: string | number;
    interestRate: string | number;
    investmentDate: string;
    maturityDate: string;
  }


interface UpInvestmentDialogProps {
  open: boolean;
  onClose: () => void;
  refreshPage?: ()=> void;
  errorHandle?: (value:boolean)=> void,
  editInvestment: UserInvestment 
  updateMessage: (message:string)=>void
  investmentId: string
}

const UpdateInvestmentDialog = ({ open, onClose, refreshPage, errorHandle, editInvestment, investmentId, updateMessage }: UpInvestmentDialogProps) => {
    const [message, setMessage] = useState('');
  const { handleSubmit, control, setValue, reset, watch } = useForm<FormData>({
    defaultValues: {
      investmentName: editInvestment.investmentName, // Initialize with an empty string
      investmentType: editInvestment.investmentType,
      investmentAmount: editInvestment.investmentAmount,
      maturityPeriod: editInvestment.maturityPeriod,
      expectedReturn: editInvestment.expectedReturn,
      interestRate: editInvestment.interestRate,
      investmentDate: dayjs(editInvestment.investmentDate),
  maturityDate: dayjs(editInvestment.maturityDate)
    },
  });
  const investmentType = watch('investmentType');


  const billPeriods = [3, 6, 12]
  const bondPeriods = [24, 60]
  

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      investmentDate: data.investmentDate ? data.investmentDate.toISOString() : null,
      maturityDate: data.maturityDate ? data.maturityDate.toISOString() : null,
    };
    try{
      const response = await  fetch(process.env.NEXT_PUBLIC_API_URL + `/investment/update?id=${investmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
  
      })
      if (!response.ok){
        throw new Error("Internal Error")
      } else{
        console.log("Investment Succefully Updated");
        errorHandle(false);
        updateMessage("Investment Successfully Updated");
        reset();
        onClose();
        refreshPage();
      
      }
    } catch(error){
        errorHandle(true);
        onClose();
        reset();
    }
   
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Investment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} sx={{ margin: 2 }}>
            <Controller
              name="investmentName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Investment Name"
                />
              )}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="investment-type-label">Investment Type</InputLabel>
              <Controller
                name="investmentType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="investment-type-label"
                    label="Investment Type"
                  >
                    <MenuItem value="Treasury Bills">Treasury Bills</MenuItem>
                    <MenuItem value="Treasury Bonds">Treasury Bonds</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name="investmentAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Investment Amount"
                  type="number"
                />
              )}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="investment-period-label">Maturity Period</InputLabel>
              <Controller
                name="maturityPeriod"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="investment-period-label"
                    label="Maturity Period"
                  >
                    {investmentType === "Treasury Bills" && billPeriods.map((period) => (
                      <MenuItem key={period} value={period}>
                        {period} months
                      </MenuItem>
                    ))}
                    {investmentType === "Treasury Bonds" && bondPeriods.map((period) => (
                      <MenuItem key={period} value={period}>
                        {period} months
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name="expectedReturn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Expected Return"
                  type="number"
                />
              )}
            />
            <Controller
              name="interestRate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Interest Rate"
                  type="number"
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="investmentDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Select Investment Date"
                    format="D/M/YYYY"
                    onChange={(date) => setValue('investmentDate', date)}
                  />
                )}
              />
              <Controller
                name="maturityDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Select Maturity Date"
                    format="D/M/YYYY"
                    onChange={(date) => setValue('maturityDate', date)}
                  />
                )}
              />
            </LocalizationProvider>
            <Button type="submit" variant="contained">
              Update Investment
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
    
  );
};

export default UpdateInvestmentDialog;
