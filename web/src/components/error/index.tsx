import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';



function ErrorComponent() {
    return (
        <div className='error-container'>
            <p>เกิดข้อผิดพลาดไม่สามารถให้บริการได้ในขณะนี้</p>
            <Link to="/" replace>กลับไปหน้าหลัก</Link>
        </div>
    );
}

export default ErrorComponent