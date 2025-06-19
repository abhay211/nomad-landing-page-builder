
import React, { useState } from 'react';
import { Users, Calendar, Heart, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

const StepOne = () => {
  const [groupSize, setGroupSize] = useState(3);
  const [tripLength, setTripLength] = useState([5]);
  const [selectedVibe, setSelectedVibe] = useState('Relax');
  const [budget, setBudget] = useState('Medium');

  const vibes = ['Adventure', 'Relax', 'Culture', 'Food', 'Nature'];
  const budgets = ['Low ($)', 'Medium ($$)', 'High ($$$)'];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sage-100">
          <div className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-bold">
            1
          </div>
          <span className="font-albert-sans font-medium text-gray-900">Tell Us About Your Trip</span>
        </div>
        
        <h2 className="font-albert-sans font-light text-4xl text-gray-900 leading-tight">
          Pick your travel vibe, group size, and budget. <span className="text-sage-600">We'll do the rest.</span>
        </h2>
        
        <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
          Start by sharing your preferences. Our AI uses this information to create personalized itineraries that match your group's style and budget.
        </p>
      </div>

      <div className="relative">
        <div 
          className="absolute inset-0 rounded-3xl opacity-20"
          style={{
            backgroundImage: `url('/lovable-uploads/eb8e2e66-d086-47d7-b63b-b86ac60c9921.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-6">Plan Your Trip</h3>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 font-satoshi font-medium text-gray-700 mb-3">
                <Users className="w-5 h-5 text-sage-600" />
                Group Size: {groupSize} people
              </label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map((size) => (
                  <Button
                    key={size}
                    variant={groupSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGroupSize(size)}
                    className={groupSize === size ? "bg-sage-500 hover:bg-sage-600" : ""}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-satoshi font-medium text-gray-700 mb-3">
                <Calendar className="w-5 h-5 text-sage-600" />
                Trip Length: {tripLength[0]} days
              </label>
              <Slider
                value={tripLength}
                onValueChange={setTripLength}
                max={14}
                min={2}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-satoshi font-medium text-gray-700 mb-3">
                <Heart className="w-5 h-5 text-sage-600" />
                Vibe
              </label>
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibe) => (
                  <Button
                    key={vibe}
                    variant={selectedVibe === vibe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVibe(vibe)}
                    className={selectedVibe === vibe ? "bg-sage-500 hover:bg-sage-600" : ""}
                  >
                    {vibe}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-satoshi font-medium text-gray-700 mb-3">
                <DollarSign className="w-5 h-5 text-sage-600" />
                Budget
              </label>
              <div className="flex gap-2">
                {budgets.map((budgetOption) => (
                  <Button
                    key={budgetOption}
                    variant={budget === budgetOption ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBudget(budgetOption)}
                    className={budget === budgetOption ? "bg-sage-500 hover:bg-sage-600" : ""}
                  >
                    {budgetOption}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
