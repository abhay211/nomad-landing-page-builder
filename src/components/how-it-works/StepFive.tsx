
import React, { useState } from 'react';
import { Heart, Share, QrCode, Link, Users, Check } from 'lucide-react';
import { Button } from '../ui/button';

const StepFive = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sage-100">
          <div className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-bold">
            5
          </div>
          <span className="font-albert-sans font-medium text-gray-900">Save or Share</span>
        </div>
        
        <h2 className="font-albert-sans font-light text-4xl text-gray-900 leading-tight">
          <span className="text-sage-600">Save your plan</span> or share it with your travel crew.
        </h2>
        
        <p className="font-satoshi text-gray-600 text-lg leading-relaxed">
          Your perfect itinerary is ready! Save it to your account for easy access or share it with friends so everyone can get excited about the upcoming adventure.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <Heart className="w-6 h-6 text-red-500 mb-2" />
            <p className="font-satoshi font-medium text-sm text-gray-900 mb-1">Save to Favorites</p>
            <p className="text-xs text-gray-600">Access anytime from your dashboard</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <Users className="w-6 h-6 text-sage-600 mb-2" />
            <p className="font-satoshi font-medium text-sm text-gray-900 mb-1">Share with Group</p>
            <p className="text-xs text-gray-600">Let everyone vote on activities</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          className="absolute inset-0 rounded-3xl opacity-10"
          style={{
            backgroundImage: `url('/lovable-uploads/c79d0a0f-c625-49b7-95b5-5811214407e9.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-sage-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-2">Your Itinerary is Ready!</h3>
            <p className="text-gray-600">Bali Bliss • 5 Days • ₹80,000</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleSave}
              className={`w-full transition-all duration-300 ${
                isSaved 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-sage-500 hover:bg-sage-600'
              }`}
              disabled={isSaved}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved to My Trips!
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Save to My Trips
                </>
              )}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-gray-500">or</span>
              </div>
            </div>
            
            <Button 
              onClick={handleShare}
              variant="outline" 
              className={`w-full transition-all duration-300 ${
                isShared 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              disabled={isShared}
            >
              {isShared ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share className="w-4 h-4 mr-2" />
                  Share with Friends
                </>
              )}
            </Button>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-satoshi font-medium text-gray-900 text-sm">Share Options:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <QrCode className="w-3 h-3 mr-1" />
                  QR Code
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Link className="w-3 h-3 mr-1" />
                  Copy Link
                </Button>
              </div>
              <div className="bg-white rounded p-2 border-2 border-dashed border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-mono">nomad.app/trip/bali-bliss-xyz</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs">😊</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
            <div className="text-xs text-gray-500">Happy travelers ready to go!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
