import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { type Filters, type Platform } from "@/lib/types";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface InsightFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function InsightFilters({ filters, onChange }: InsightFiltersProps) {
  const [username, setUsername] = useState(filters.username);

  // Debounce onChange call, not the input itself
  const debouncedOnChange = useMemo(
    () =>
      debounce((nextUsername: string) => {
        onChange({ ...filters, username: nextUsername });
      }, 1000),
    [filters, onChange]
  );

  // Call debounced function when username local state changes
  useEffect(() => {
    debouncedOnChange(username);
    return () => {
      debouncedOnChange.cancel(); // cancel pending calls on unmount
    };
  }, [username, debouncedOnChange]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value); // updates immediately in the input
  };

  const handlePlatformChange = (platform: Platform) => {
    onChange({ ...filters, platform });
  };

  const handleStartDateChange = (startDate: Date | undefined) => {
    if (startDate) {
      onChange({ ...filters, startDate });
    }
  };

  const handleEndDateChange = (endDate: Date | undefined) => {
    if (endDate) {
      onChange({ ...filters, endDate });
    }
  };

  return (
    <div className="flex flex-row items-center gap-4 flex-wrap">
      <div className="flex flex-col gap-2">
        <Label>Username</Label>
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          className="w-48"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Platform</Label>
        <Select value={filters.platform} onValueChange={handlePlatformChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chessdotcom">Chess.com</SelectItem>
            <SelectItem value="lichess">Lichess.org</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DatePicker
        date={filters.startDate}
        label="Start Date"
        onChange={handleStartDateChange}
      />

      <DatePicker
        date={filters.endDate}
        label="End Date"
        onChange={handleEndDateChange}
      />
    </div>
  );
}
